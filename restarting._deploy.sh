#!/bin/bash
set -e

echo "🔄 Reiniciando containers existentes..."
docker compose restart django go_app_dev nextjs

# Espera os containers ficarem prontos
wait_for_container() {
    local container=$1
    echo "⏳ Aguardando container '$container' estar pronto..."
    while true; do
        if docker compose exec -T "$container" echo "✅ $container pronto" &>/dev/null; then
            echo "✅ Container '$container' está pronto!"
            return 0
        fi
        sleep 2
    done
}

wait_for_container django
wait_for_container go_app_dev
wait_for_container nextjs

# Migrações Django
echo "🔎 Verificando migrações pendentes..."
MIGRATIONS_PENDING=$(docker compose exec -T django bash -c 'pipenv run python manage.py showmigrations | grep "\[ \]"' | wc -l)

if [ "$MIGRATIONS_PENDING" -gt 0 ]; then
    echo "⚒️ Aplicando migrações pendentes..."
    docker compose exec -T django bash -c 'pipenv run python manage.py migrate'
else
    echo "✅ Nenhuma migração pendente"
fi

# Superusuário
echo "👤 Garantindo superusuário Django..."
docker compose exec -T django bash -c "
pipenv run python manage.py shell -c \"
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(email='admin@user.com').exists():
    User.objects.create_superuser('admin1', 'admin@user.com', 'secret')
\""

# Consumidores Django (background)
echo "🎬 Reiniciando consumidores Django..."
docker compose exec -T django bash -c "pipenv run python manage.py consumer_upload_chunks_to_external_storage" &
docker compose exec -T django bash -c "pipenv run python manage.py consumer_register_processed_video_path" &

sleep 3

echo ""
echo "✅ Restart concluído! Logs a seguir:"
docker compose logs -f django go_app_dev nextjs
