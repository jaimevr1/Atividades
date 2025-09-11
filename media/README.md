# Media Organization - Educational Activities

This directory contains all media assets for the educational activities application. All files are currently placeholders that should be replaced with actual media content.

## Directory Structure

```
media/
├── audios/
│   ├── historia/
│   │   ├── bloco_1/          # History Block 1 audio files
│   │   ├── bloco_2/          # History Block 2 audio files
│   │   ├── bloco_3/          # History Block 3 audio files
│   │   ├── bloco_4/          # History Block 4 audio files
│   │   ├── bloco_5/          # History Block 5 audio files
│   │   └── bloco_6/          # History Block 6 audio files
│   └── matematica/           # Math audio files organized by blocks (27 blocks total)
│       ├── bloco_01/         # Addition and Subtraction (Basic) - 10 files
│       ├── bloco_02/         # Addition and Subtraction (Medium) - 10 files  
│       ├── bloco_03/         # Addition and Subtraction (Advanced) - 10 files
│       ├── bloco_04/         # Introduction to Multiplication - 10 files
│       ├── bloco_05/         # Basic Multiplication - 10 files
│       ├── bloco_06/         # Mixed Operations (Add, Sub, Mult) - 10 files
│       ├── bloco_07/         # Advanced Mixed Operations - 10 files
│       ├── bloco_08/         # Introduction to Division - 10 files
│       ├── bloco_09/         # Basic Division - 10 files
│       ├── bloco_10/         # All 4 Operations (Basic) - 10 files
│       ├── bloco_11/         # All 4 Operations (Medium) - 10 files
│       ├── bloco_12/         # All 4 Operations (Advanced) - 10 files
│       ├── bloco_13/         # Problems with Larger Numbers - 10 files
│       ├── bloco_14/         # Multi-step Problems - 10 files
│       ├── bloco_15/         # Contextualized Problems - 10 files
│       ├── ...               # Blocks 16-26 (Progressive difficulty)
│       └── bloco_27/         # Advanced Mathematical Challenges - 10 files
├── musicas/
│   └── fundo/                # Background music files
│       ├── musica_fundo_1.mp3
│       ├── musica_fundo_2.mp3
│       ├── musica_fundo_3.mp3
│       ├── musica_fundo_4.mp3
│       └── musica_fundo_5.mp3
├── sons/
│   └── feedback/             # Feedback sound effects
│       ├── acertos/          # Correct answer sounds
│       │   ├── acerto_1.mp3
│       │   ├── acerto_2.mp3
│       │   ├── acerto_3.mp3
│       │   └── acerto_4.mp3
│       └── erros/            # Wrong answer sounds
│           ├── erro_1.mp3
│           ├── erro_2.mp3
│           ├── erro_3.mp3
│           └── erro_4.mp3
├── caminhos/                 # Historical path illustrations
│   ├── ilustra_cabral.png
│   ├── ilustra_salvador.png
│   ├── ilustra_franca_antartica.png
│   ├── ilustra_grito_ipiranga.png
│   └── ilustra_constituicao_88.png
└── misterios/                # Detective mystery evidence images
    ├── familia_real_1808.png
    ├── dia_do_fico_1821.png
    ├── grito_ipiranga_1822.png
    ├── proclamacao_republica_1889.png
    └── constituicao_cidada_1988.png
```

## File Specifications

### Audio Files
- **Format**: MP3 recommended
- **Quality**: 128-320 kbps
- **Language**: Portuguese (Brazil)
- **Target Audience**: Elementary school children
- **Duration**: 
  - **Statement (enunciado)**: 15-30 seconds
  - **Explanation (explicacao)**: 20-40 seconds
- **Naming Convention**: `bloco_XX_questao_X_TIPO.mp3`
  - XX = Block number (01-27)
  - X = Question number (1-5)
  - TIPO = `enunciado` or `explicacao`

### Background Music
- **Volume**: Automatically set to 15% in application
- **Style**: Calm, educational ambient music
- **Loop**: Files will loop automatically
- **Duration**: 2-5 minutes recommended

### Feedback Sounds
- **Volume**: Automatically set to 70% in application
- **Correct Sounds**: Positive, encouraging (chimes, bells, applause)
- **Error Sounds**: Gentle, non-discouraging (soft buzzer, "try again" tones)
- **Duration**: 1-3 seconds

### Images
- **Format**: PNG recommended
- **Size**: 300x200 to 400x300 pixels
- **Style**: Educational illustrations suitable for children
- **Content**: Historical events and educational content

## Replacement Instructions

1. **Maintain exact file names** - The application code references these specific names
2. **Keep directory structure** - Do not change folder organization
3. **Verify file formats** - Use MP3 for audio, PNG for images
4. **Test volume levels** - Ensure audio is clear but not overwhelming
5. **Child-appropriate content** - All media should be suitable for elementary students

## Application Integration

All media files are integrated into the educational activities and will:
- Play automatically at appropriate times
- Respect volume settings configured in the application
- Handle missing files gracefully (log to console without breaking functionality)
- Support the educational goals of each activity

## Notes

- Files marked as "PLACEHOLDER" should be replaced with actual media content
- The application will continue to function even if some media files are missing
- Audio files use anti-overlap technology to prevent multiple sounds playing simultaneously
- Background music automatically reduces volume during educational audio playback