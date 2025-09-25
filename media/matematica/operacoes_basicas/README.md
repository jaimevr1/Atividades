# Estrutura de Mídia - Operações Matemáticas

Esta pasta contém os arquivos de mídia para a atividade educacional "Operações Básicas de Matemática".

## Estrutura de Diretórios

```
operacoes_basicas/
├── bloco_1/              # Nível Básico - Soma
│   ├── questao_1_enunciado.mp3
│   ├── questao_1_explicacao.mp3
│   ├── questao_2_enunciado.mp3
│   ├── questao_2_explicacao.mp3
│   ├── questao_3_enunciado.mp3
│   ├── questao_3_explicacao.mp3
│   ├── questao_4_enunciado.mp3
│   ├── questao_4_explicacao.mp3
│   └── imagens/
│       ├── questao_1_ilustracao.png
│       ├── questao_2_ilustracao.png
│       ├── questao_3_ilustracao.png
│       └── questao_4_ilustracao.png
├── bloco_2/              # Nível Básico - Subtração
├── bloco_3/              # Nível Básico - Multiplicação
├── bloco_4/              # Nível Intermediário - Operações Combinadas
├── bloco_5/              # Nível Intermediário - Divisão
├── bloco_6/              # Nível Intermediário - Comparações
├── bloco_7/              # Nível Avançado - Problemas Avançados
├── bloco_8/              # Nível Avançado - Proporções
└── bloco_9/              # Nível Avançado - Desafios Complexos
```

## Tipos de Arquivos

### Áudio (.mp3)
- **questao_X_enunciado.mp3**: Narração do enunciado da questão
- **questao_X_explicacao.mp3**: Explicação da resposta correta

### Imagens (.png)
- **questao_X_ilustracao.png**: Ilustração visual da questão para apoio didático

## Padrões de Nomenclatura

- Usar sempre letras minúsculas
- Separar palavras com underscore (_)
- Seguir o padrão: questao_[número]_[tipo].[extensão]
- Exemplo: `questao_1_enunciado.mp3`

## Especificações Técnicas

### Áudio
- Formato: MP3
- Taxa de bits: 128 kbps ou superior
- Frequência: 44.1 kHz
- Duração recomendada: 10-30 segundos por arquivo
- Idioma: Português brasileiro (pt-BR)

### Imagens
- Formato: PNG (com transparência) ou JPG
- Resolução: 800x600 pixels (4:3)
- Tamanho máximo: 500KB por arquivo
- Adequadas para crianças (cores alegres, ilustrações claras)

## Acessibilidade

- Todos os áudios devem ter dicção clara e velocidade adequada para crianças
- Imagens devem ter alto contraste e elementos bem definidos
- Textos alternativos (alt text) implementados no código HTML
- Fallback para text-to-speech quando áudio não estiver disponível