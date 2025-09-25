#!/bin/bash
echo "�� Workflow Integrado Claude Code + Qwen Coder"

FILE=$1
SUBJECT=$2
ACTIVITY=$3

# 1. Claude Code: Conversão + Validação Educacional
echo "📝 Claude Code: Convertendo TSX..."
# claude-code convert "$FILE" --subject "$SUBJECT" --activity "$ACTIVITY"

# 2. Qwen Coder: Otimização + Qualidade
echo "⚡ Qwen Coder: Otimizando..."
OUTPUT_FILE="pages/${ACTIVITY,,}.html"
prettier --write "$OUTPUT_FILE"
# eslint "$OUTPUT_FILE" --fix 2>/dev/null
imagemin media/**/*.{png,jpg} --out-dir=media-optimized/ 2>/dev/null

# 3. Claude Code: Validação Final
echo "🔍 Claude Code: Validação final..."
htmlhint "$OUTPUT_FILE"
pa11y "$OUTPUT_FILE" --threshold 10

echo "✅ Workflow integrado concluído!"
