#!/bin/bash
echo "🚀 Deploy rápido..."

# Validar antes de fazer deploy
echo "🔍 Validação pré-deploy..."
htmlhint pages/*.html || { echo "❌ HTML inválido"; exit 1; }
pa11y pages/*.html --threshold 10 || { echo "❌ Problemas de acessibilidade"; exit 1; }

# Otimizar imagens
echo "🎨 Otimizando imagens..."
imagemin media/**/*.{png,jpg} --out-dir=media-optimized/

# Deploy
echo "🌐 Fazendo deploy..."
DOMAIN="atividades-educativas-$(date +%s).surge.sh"
surge pages/ $DOMAIN

echo "✅ Deploy concluído: https://$DOMAIN"
