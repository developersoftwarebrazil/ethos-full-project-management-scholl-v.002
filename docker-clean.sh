#!/bin/bash

# Script para limpar Docker completamente

echo "Parando containers e removendo volumes e orfãos..."
docker compose down -v --remove-orphans

echo "Limpando todo o sistema Docker (imagens, containers, volumes não usados)..."
docker system prune -a --volumes -f

echo "Removendo volume externo 'external-storage'..."
docker volume rm external-storage

echo "Limpeza Docker concluída!"
