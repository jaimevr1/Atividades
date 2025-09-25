#!/bin/bash
FILE=$1

if [ -z "$FILE" ]; then
    echo "Uso: ./quick-validate.sh arquivo.html"
    exit 1
fi

echo "🔍 Validando: $FILE"

echo "📝 HTML:"
htmlhint "$FILE"

echo "♿ Acessibilidade:" 
pa11y "$FILE" --threshold 10

echo "🔗 Links:"
linkinator "$FILE"

echo "✅ Validação concluída!"
