#!/bin/bash
INPUT_FILE=$1
SUBJECT=$2
ACTIVITY_NAME=$3

echo "🤖 Workflow Claude Code + Qwen Coder iniciado..."

# Fase 1: Claude Code - Conversão
echo "📝 Claude Code: Convertendo e validando..."
claude-code --agent tsx-converter \
  --input "$INPUT_FILE" \
  --subject "$SUBJECT" \
  --activity "$ACTIVITY_NAME" \
  --create-media-structure

# Fase 2: Qwen Coder - Otimização  
echo "⚡ Qwen Coder: Otimizando performance..."
qwen-coder --agent performance-optimizer \
  --input "pages/${ACTIVITY_NAME,,}.html" \
  --preserve-educational-structure

echo "♿ Qwen Coder: Melhorando acessibilidade..."
qwen-coder --agent accessibility-enhancer \
  --input "pages/${ACTIVITY_NAME,,}.html" \
  --target-wcag-aa

# Fase 3: Claude Code - Validação Final
echo "🔍 Claude Code: Validação final..."
claude-code --agent content-validator \
  --input "pages/${ACTIVITY_NAME,,}.html" \
  --comprehensive-check

echo "✅ Workflow colaborativo concluído!"
