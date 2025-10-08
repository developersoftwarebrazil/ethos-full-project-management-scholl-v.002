#!/usr/bin/env bash

echo "📁 Diretório atual: $(basename "$(pwd)")"

# Verifica se é repositório Git
if [ ! -d .git ]; then
  echo "🚫 Este diretório não é um repositório Git. Deseja inicializar? (s/n)"
  read -r INIT
  if echo "$INIT" | grep -iq "^s$"; then
    git init
  else
    echo "❌ Encerrando script."
    exit 1
  fi
fi

# Exibe repositório remoto atual
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null)
if [ -n "$CURRENT_REMOTE" ]; then
  echo "🔗 Repositório remoto atual: $CURRENT_REMOTE"
else
  echo "⚠️ Nenhum repositório remoto configurado."
fi

# Commit de alterações locais
echo ""
read -p "📦 Deseja adicionar e commitar as alterações locais? (s/n): " DO_COMMIT
if echo "$DO_COMMIT" | grep -iq "^s$"; then
  git add .
  read -p "📝 Mensagem do commit: " COMMIT_MSG
  git commit -m "$COMMIT_MSG" || echo "⚠️ Nenhuma alteração nova para commitar."
fi

# Criação do repositório via GitHub CLI
echo ""
read -p "❓ Deseja criar um novo repositório remoto e substituir o atual? (s/n): " CHANGE_REMOTE
if echo "$CHANGE_REMOTE" | grep -iq "^s$"; then
  if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) não está instalado. Instale com: sudo apt install gh -y"
    exit 1
  fi

  # Verifica autenticação
  if ! gh auth status &>/dev/null; then
    echo "🔐 Você não está autenticado no GitHub CLI."
    gh auth login
  fi

  # Coleta dados
  read -p "📦 Nome do novo repositório no GitHub: " REPO_NAME
  read -p "🌐 Visibilidade (public/private): " REPO_VISIBILITY

  echo "🚧 Criando repositório '$REPO_NAME' no GitHub..."
  gh repo create "$REPO_NAME" --"$REPO_VISIBILITY" --source=. --remote=origin --push

  if [ $? -ne 0 ]; then
    echo "❌ Falha ao criar repositório via GitHub CLI."
    exit 1
  fi

  echo "✅ Repositório criado e vinculado com sucesso!"
fi

# Garante branch "main"
git branch -M main

# Push final
echo "🚀 Enviando alterações para o GitHub..."
git push -u origin main

echo "✅ Pronto! Tudo foi enviado para: $(git remote get-url origin)"
