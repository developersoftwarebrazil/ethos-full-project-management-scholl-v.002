#!/bin/bash

set -e

# =======================
# ⚙️ Utilitários
# =======================
kill_port() {
    local port=$1
    echo "🔧 Tentando liberar porta $port (se necessário)..."

    if command -v lsof >/dev/null; then
        lsof -ti tcp:$port | xargs -r kill -9 || true
    fi

    if command -v fuser >/dev/null; then
        fuser -k ${port}/tcp || true
    fi
}

kill_django_background() {
    echo "🧹 Finalizando processos Django travados..."
    ps aux | grep runserver | grep -v grep | awk '{print $2}' | xargs -r kill -9 || true
}

# =======================
# 🚀 Restart simples
# =======================

echo "🔪 Encerrando processos que podem estar usando as portas necessárias..."
kill_port 8000
kill_port 3000
kill_port 3001
kill_port 3002
kill_django_background

echo "🛑 Parando containers existentes..."
docker compose down

echo "🔧 Subindo containers novamente..."
docker compose up -d --build

echo "✅ Containers reiniciados!"
echo ""
docker compose ps
