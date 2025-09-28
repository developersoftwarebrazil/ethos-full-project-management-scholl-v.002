#!/bin/bash

set -e

# =======================
# 🔧 Configurações iniciais
# =======================
DEFAULT_VOLUME_NAME="external-storage"
VOLUME_NAME="$DEFAULT_VOLUME_NAME"

# =======================
# 🔑 Solicitar senha do usuário
# =======================
confirm_user_password() {
    echo "🔑 Confirme a senha do usuário '$USER' para continuar."
    sudo -k # força pedir a senha de novo
    if sudo true; then
        echo "✅ Senha confirmada."
    else
        echo "❌ Senha incorreta. Abortando."
        exit 1
    fi
}

# =======================
# 📦 Verificação/Criação de volume Docker externo
# =======================
check_or_create_external_volume() {
    local volume_name=$1
    echo "🗃️ Verificando volume externo Docker '$volume_name'..."

    if docker volume inspect "$volume_name" >/dev/null 2>&1; then
        echo "⚠️ Volume externo '$volume_name' já existe."
        read -p "❓ Deseja manter o volume existente? [s/N]: " manter
        manter=${manter,,} # converte para minúsculo
        if [[ "$manter" != "s" && "$manter" != "sim" ]]; then
            echo "🗑️ Removendo volume '$volume_name' e containers relacionados..."
            confirm_user_password
            docker compose down -v --remove-orphans
            docker system prune -a --volumes -f
            docker volume rm "$volume_name"
            echo "📦 Volume '$volume_name' removido."
            echo "📦 Criando novo volume '$volume_name'..."
            confirm_user_password
            docker volume create --name "$volume_name"
            echo "✅ Novo volume '$volume_name' criado."
        else
            echo "✅ Mantendo volume '$volume_name'."
        fi
    else
        echo "⚠️ Nenhum volume chamado '$volume_name' encontrado."
        read -p "❓ Deseja criar um novo volume agora? [S/n]: " criar
        criar=${criar,,}
        if [[ "$criar" != "n" && "$criar" != "nao" ]]; then
            read -p "🔤 Digite um nome para o novo volume Docker (Enter para usar '$DEFAULT_VOLUME_NAME'): " new_volume_name
            volume_name="${new_volume_name:-$DEFAULT_VOLUME_NAME}"
            echo "📦 Criando volume externo '$volume_name'..."
            confirm_user_password
            docker volume create --name "$volume_name"
            echo "✅ Volume externo '$volume_name' criado com sucesso!"
        else
            echo "❌ Nenhum volume criado. Abortando."
            exit 1
        fi
    fi

    export VOLUME_NAME="$volume_name"
}

# =======================
# ⚙️ Utilitários
# =======================
run_or_fail() {
    echo "⚙️ Executando: $1"
    eval "$1" || { echo "❌ Erro ao executar: $1"; exit 1; }
}

wait_for_container() {
    local container=$1
    echo "⏳ Aguardando container '$container' estar pronto..."
    while true; do
        if docker compose exec -T "$container" echo "✅ $container pronto" &>/dev/null; then
            echo "✅ Container '$container' está pronto!"
            return 0
        fi
        sleep 3
    done
}

kill_port() {
    local port=$1
    echo "🔧 Tentando liberar porta $port (se necessário)..."

    if command -v lsof >/dev/null; then
        lsof -ti tcp:$port | xargs -r kill -9 || true
    fi

    if command -v fuser >/dev/null; then
        fuser -k ${port}/tcp || true
    fi

    # Extra: se estiver usando WSL
    if grep -qi microsoft /proc/version && command -v netstat >/dev/null; then
        pid=$(netstat -ano | grep ":$port" | grep LISTEN | awk '{print $NF}' | head -n 1)
        if [ -n "$pid" ]; then
            echo "💀 Matando processo $pid (WSL)..."
            kill -9 "$pid" || true
        fi
    fi
}

kill_django_background() {
    echo "🧹 Finalizando processos Django travados..."
    ps aux | grep runserver | grep -v grep | awk '{print $2}' | xargs -r kill -9 || true
}

# =======================
# 🚀 Execução principal
# =======================
check_or_create_external_volume "$VOLUME_NAME"

echo "🔪 Finalizando processos que podem estar usando as portas necessárias..."
kill_port 8000
kill_port 3000
kill_port 3001
kill_port 3002
kill_django_background

echo "🔧 Parando containers existentes e limpando..."
docker compose down -v --remove-orphans
docker system prune -a --volumes -f
docker image prune -f || true

echo "🔧 Subindo containers com Docker Compose..."
docker compose up -d --build

wait_for_container django

echo "📦 Instalando dependências do Django..."
docker compose exec -T django bash -c "
command -v pipenv >/dev/null 2>&1 || (echo '⚙️ Instalando pipenv...' && pip install pipenv)
pipenv install
"

echo "🔎 Verificando migrações pendentes..."
MIGRATIONS_PENDING=$(docker compose exec -T django bash -c 'pipenv run python manage.py showmigrations | grep "\[ \]"' | wc -l)

if [ "$MIGRATIONS_PENDING" -gt 0 ]; then
    echo "⚒️ Migrações pendentes detectadas, aplicando..."
    run_or_fail "docker compose exec -T django bash -c 'pipenv run python manage.py migrate'"
else
    echo "✅ Nenhuma migração pendente"
fi

echo "👤 Garantindo superusuário Django e roles padrão..."
docker compose exec -T django bash -c "
pipenv run python manage.py shell -c \"
from django.contrib.auth import get_user_model;
from school_contebras_core_accounts.models import Role;

User = get_user_model();

# 🔹 Criar roles padrão
roles = ['admin', 'common', 'teacher', 'student', 'supervisor']
for r in roles:
    Role.objects.get_or_create(name=r)

# 🔹 Criar superusuário
admin_user, created = User.objects.get_or_create(username='admin@user.com', defaults={
    'email': 'admin@user.com',
    'is_staff': True,
    'is_superuser': True
})
if created:
    admin_user.set_password('secret')
    admin_user.save()
    print('✅ Superusuário criado')
else:
    print('✅ Superusuário já existe, pulando...')

# 🔹 Vincular role admin ao superusuário
admin_role = Role.objects.get(name='admin')
if admin_role not in admin_user.roles.all():
    admin_user.roles.add(admin_role)
    print('✅ Role admin atribuída ao superusuário')
else:
    print('✅ Superusuário já possui role admin')
\"
"

wait_for_container go_app_dev
wait_for_container nextjs

echo "🎬 Iniciando consumidores Django em background..."
docker compose exec -T django bash -c "pipenv run python manage.py consumer_upload_chunks_to_external_storage" &
docker compose exec -T django bash -c "pipenv run python manage.py consumer_register_processed_video_path" &

sleep 5

echo ""
echo "✅ Ambiente pronto! Logs a seguir:"
echo ""

docker compose logs -f django go_app_dev nextjs
