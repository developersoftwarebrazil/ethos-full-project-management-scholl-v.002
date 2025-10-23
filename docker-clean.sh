#!/bin/bash

# ============================================
# SCRIPT: reset_all.sh
# Limpa completamente o ambiente Docker e o banco Django
# ============================================

echo "🚫 Parando containers e removendo volumes órfãos..."
docker compose down -v --remove-orphans

echo "🧹 Limpando todo o sistema Docker (imagens, containers, volumes não usados)..."
docker system prune -a --volumes -f

echo "🗑️  Removendo volume externo 'external-storage' (se existir)..."
docker volume rm external-storage 2>/dev/null || echo "Nenhum volume 'external-storage' encontrado."

echo "✅ Limpeza Docker concluída!"
echo "----------------------------------------"

# ============================================
# Reset do banco Django
# ============================================

echo "🧹 Limpando banco e migrações Django..."
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

# Remove o banco local (caso use SQLite)
if [ -f "db.sqlite3" ]; then
  rm -f db.sqlite3
  echo "🗑️  Arquivo db.sqlite3 removido."
fi

echo "📦 Recriando banco de dados e migrações..."
python manage.py makemigrations
python manage.py migrate

echo "✅ Banco Django zerado e sincronizado!"
echo "----------------------------------------"

echo "🚀 Ambiente pronto para novo início!"
