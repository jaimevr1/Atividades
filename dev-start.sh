#!/bin/bash
echo "🚀 Iniciando ambiente de desenvolvimento..."

# Navegar para projeto
cd /mnt/c/Users/jaime/Documents/GitHub/Atividades

# Verificar ferramentas
echo "🔧 Verificando ferramentas..."
htmlhint --version || echo "❌ htmlhint não encontrado"
prettier --version || echo "❌ prettier não encontrado"
pa11y --version || echo "❌ pa11y não encontrado"

# Iniciar servidor
echo "🖥️ Iniciando servidor local..."
live-server pages/ --port=3000 &
echo "✅ Servidor disponível em: http://localhost:3000"
