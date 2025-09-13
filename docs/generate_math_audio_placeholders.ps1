# PowerShell Script to Generate Mathematics Audio Placeholders
# This script creates all 270 mathematics audio placeholder files
# Usage: Run this script in PowerShell from the Atividades directory

Write-Host "Creating Mathematics Audio Placeholder Files..." -ForegroundColor Green
Write-Host "Total files to create: 270 (27 blocks × 5 questions × 2 audio types)" -ForegroundColor Yellow

$totalFiles = 0
$blocksData = @{
    1 = @{ topic = "Soma e Subtração (Básico)"; level = "elementary" }
    2 = @{ topic = "Soma e Subtração (Médio)"; level = "elementary" }
    3 = @{ topic = "Soma e Subtração (Avançado)"; level = "elementary" }
    4 = @{ topic = "Introdução à Multiplicação"; level = "elementary" }
    5 = @{ topic = "Multiplicação Básica"; level = "elementary" }
    6 = @{ topic = "Operações Mistas (Soma, Subtração, Multiplicação)"; level = "elementary" }
    7 = @{ topic = "Operações Mistas Avançadas"; level = "intermediate" }
    8 = @{ topic = "Introdução à Divisão"; level = "intermediate" }
    9 = @{ topic = "Divisão Básica"; level = "intermediate" }
    10 = @{ topic = "Todas as 4 Operações (Básico)"; level = "intermediate" }
    11 = @{ topic = "Todas as 4 Operações (Médio)"; level = "intermediate" }
    12 = @{ topic = "Todas as 4 Operações (Avançado)"; level = "intermediate" }
    13 = @{ topic = "Problemas com Números Maiores"; level = "intermediate" }
    14 = @{ topic = "Problemas de Múltiplos Passos"; level = "advanced" }
    15 = @{ topic = "Problemas Contextualizados"; level = "advanced" }
    27 = @{ topic = "Desafios Matemáticos Avançados"; level = "advanced" }
}

for ($block = 1; $block -le 27; $block++) {
    $blockStr = $block.ToString("00")
    $blockDir = "media/audios/matematica/bloco_$blockStr"
    
    # Get block info or use default
    if ($blocksData.ContainsKey($block)) {
        $blockInfo = $blocksData[$block]
    } else {
        $blockInfo = @{ topic = "Operações Matemáticas Variadas"; level = "intermediate" }
    }
    
    Write-Host "Creating Block $blockStr - $($blockInfo.topic)" -ForegroundColor Cyan
    
    for ($question = 1; $question -le 5; $question++) {
        # Create enunciado (statement) file
        $enunciadoFile = "$blockDir/bloco_${blockStr}_questao_${question}_enunciado.mp3"
        $enunciadoContent = @"
# PLACEHOLDER - Mathematics Audio: Block $blockStr, Question $question, Statement
# This is a placeholder file for bloco_${blockStr}_questao_${question}_enunciado.mp3
# Block Topic: $($blockInfo.topic)
# Difficulty Level: $($blockInfo.level)
# Content: Portuguese narration of the math problem statement
# Replace with clear Portuguese narration suitable for $($blockInfo.level) students
# Volume will be automatically set to 80% in the application
# Triggered by: Manual click on 🔊 button
# Expected Duration: 15-30 seconds
"@
        
        if (-not (Test-Path $enunciadoFile)) {
            $enunciadoContent | Out-File -FilePath $enunciadoFile -Encoding UTF8
            $totalFiles++
        }
        
        # Create explicacao (explanation) file
        $explicacaoFile = "$blockDir/bloco_${blockStr}_questao_${question}_explicacao.mp3"
        $explicacaoContent = @"
# PLACEHOLDER - Mathematics Audio: Block $blockStr, Question $question, Explanation
# This is a placeholder file for bloco_${blockStr}_questao_${question}_explicacao.mp3
# Block Topic: $($blockInfo.topic)
# Difficulty Level: $($blockInfo.level)
# Content: Portuguese narration explaining why the answer is correct
# Replace with clear Portuguese educational explanation suitable for $($blockInfo.level) students
# Volume will be automatically set to 80% in the application
# Triggered by: Automatically plays 1 second after answering the question
# Expected Duration: 20-40 seconds
# Should include: Operation type identification + calculation steps
"@
        
        if (-not (Test-Path $explicacaoFile)) {
            $explicacaoContent | Out-File -FilePath $explicacaoFile -Encoding UTF8
            $totalFiles++
        }
    }
}

Write-Host ""
Write-Host "Mathematics Audio Placeholder Generation Complete!" -ForegroundColor Green
Write-Host "Created: $totalFiles new placeholder files" -ForegroundColor Yellow
Write-Host "Structure: 27 blocks × 5 questions × 2 audio types = 270 total files" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Magenta
Write-Host "1. Replace placeholder files with actual Portuguese audio narration" -ForegroundColor White
Write-Host "2. Ensure audio quality: MP3 format, 128-320 kbps" -ForegroundColor White
Write-Host "3. Target audience: Elementary school children (6-12 years)" -ForegroundColor White
Write-Host "4. Test audio levels and clarity" -ForegroundColor White
Write-Host ""