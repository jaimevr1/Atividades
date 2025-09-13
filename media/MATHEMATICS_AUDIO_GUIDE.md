# Mathematics Audio Organization - Complete Guide

## Overview

The mathematics activities require **270 audio files** organized into 27 blocks, with each block containing 5 questions, and each question having 2 audio types (statement + explanation).

## File Structure Summary

```
media/audios/matematica/
├── bloco_01/ (10 files) - Addition and Subtraction (Basic)
├── bloco_02/ (10 files) - Addition and Subtraction (Medium)
├── bloco_03/ (10 files) - Addition and Subtraction (Advanced)
├── bloco_04/ (10 files) - Introduction to Multiplication
├── bloco_05/ (10 files) - Basic Multiplication
├── bloco_06/ (10 files) - Mixed Operations (Add, Sub, Mult)
├── bloco_07/ (10 files) - Advanced Mixed Operations
├── bloco_08/ (10 files) - Introduction to Division
├── bloco_09/ (10 files) - Basic Division
├── bloco_10/ (10 files) - All 4 Operations (Basic)
├── bloco_11/ (10 files) - All 4 Operations (Medium)
├── bloco_12/ (10 files) - All 4 Operations (Advanced)
├── bloco_13/ (10 files) - Problems with Larger Numbers
├── bloco_14/ (10 files) - Multi-step Problems
├── bloco_15/ (10 files) - Contextualized Problems
├── bloco_16/ (10 files) - Progressive Difficulty Level 16
├── bloco_17/ (10 files) - Progressive Difficulty Level 17
├── bloco_18/ (10 files) - Progressive Difficulty Level 18
├── bloco_19/ (10 files) - Progressive Difficulty Level 19
├── bloco_20/ (10 files) - Progressive Difficulty Level 20
├── bloco_21/ (10 files) - Progressive Difficulty Level 21
├── bloco_22/ (10 files) - Progressive Difficulty Level 22
├── bloco_23/ (10 files) - Progressive Difficulty Level 23
├── bloco_24/ (10 files) - Progressive Difficulty Level 24
├── bloco_25/ (10 files) - Progressive Difficulty Level 25
├── bloco_26/ (10 files) - Progressive Difficulty Level 26
└── bloco_27/ (10 files) - Advanced Mathematical Challenges
```

## Naming Convention

**Pattern**: `bloco_XX_questao_X_TIPO.mp3`

- **XX** = Block number with leading zero (01, 02, 03, ..., 27)
- **X** = Question number (1, 2, 3, 4, 5)
- **TIPO** = Audio type:
  - `enunciado` = Problem statement (manual trigger)
  - `explicacao` = Answer explanation (automatic trigger)

## Example File Names

### Block 01 (Basic Addition/Subtraction)
```
bloco_01_questao_1_enunciado.mp3    # "João tem 3 carros..."
bloco_01_questao_1_explicacao.mp3   # "Para resolver, SOMAMOS..."
bloco_01_questao_2_enunciado.mp3    # "Maria tinha 8 bonecas..."
bloco_01_questao_2_explicacao.mp3   # "Ela DEU bonecas..."
bloco_01_questao_3_enunciado.mp3    # Problem 3 statement
bloco_01_questao_3_explicacao.mp3   # Problem 3 explanation
bloco_01_questao_4_enunciado.mp3    # Problem 4 statement
bloco_01_questao_4_explicacao.mp3   # Problem 4 explanation
bloco_01_questao_5_enunciado.mp3    # Problem 5 statement
bloco_01_questao_5_explicacao.mp3   # Problem 5 explanation
```

### Block 27 (Advanced Challenges)
```
bloco_27_questao_1_enunciado.mp3    # Advanced problem statement
bloco_27_questao_1_explicacao.mp3   # Advanced explanation
bloco_27_questao_2_enunciado.mp3    # Advanced problem 2
bloco_27_questao_2_explicacao.mp3   # Advanced explanation 2
bloco_27_questao_3_enunciado.mp3    # Advanced problem 3
bloco_27_questao_3_explicacao.mp3   # Advanced explanation 3
bloco_27_questao_4_enunciado.mp3    # Advanced problem 4
bloco_27_questao_4_explicacao.mp3   # Advanced explanation 4
bloco_27_questao_5_enunciado.mp3    # Advanced problem 5
bloco_27_questao_5_explicacao.mp3   # Advanced explanation 5
```

## Audio Content Guidelines

### Statement Audio (enunciado)
- **Duration**: 15-30 seconds
- **Content**: Clear reading of the math problem
- **Tone**: Friendly, encouraging
- **Speed**: Slightly slower than normal speech
- **Trigger**: Manual click on 🔊 button
- **Example**: "João tem 3 carros de brinquedo no Roblox e ganhou mais 2. Quantos carros ele tem agora?"

### Explanation Audio (explicacao)
- **Duration**: 20-40 seconds  
- **Content**: Step-by-step explanation of the solution
- **Tone**: Teaching, patient, encouraging
- **Speed**: Slightly slower, with pauses between steps
- **Trigger**: Automatically plays 1 second after answering
- **Example**: "Para resolver, SOMAMOS os carros que ele já tinha com os que ganhou. 3 + 2 = 5 carros."

## Technical Specifications

### Audio Quality
- **Format**: MP3
- **Bitrate**: 128-320 kbps
- **Sample Rate**: 44.1 kHz
- **Channels**: Mono (recommended for smaller file size)
- **Volume**: Will be automatically set to 80% by application

### Language Requirements
- **Language**: Portuguese (Brazil)
- **Audience**: Elementary school children (6-12 years)
- **Vocabulary**: Age-appropriate mathematical terms
- **Pronunciation**: Clear, standard Brazilian Portuguese

## Integration with Application

### Audio System Features
- **Anti-Overlap Protection**: Only one audio plays at a time
- **Background Music Integration**: Background music reduces to 5% during educational audio
- **Volume Control**: Educational audio plays at 80% volume
- **Error Handling**: Missing files are handled gracefully (logged to console)

### User Experience
1. **Manual Trigger**: User clicks 🔊 button to hear problem statement
2. **Automatic Response**: Explanation plays 1 second after answering
3. **Background Music**: Continues playing at reduced volume during audio
4. **Feedback Sounds**: Separate success/error sounds play immediately when answering

## Replacement Process

1. **Maintain File Names**: Keep exact naming convention
2. **Test Audio Quality**: Ensure clear pronunciation and appropriate volume
3. **Verify Content**: Match audio content to actual problems in the application
4. **Check Duration**: Keep within recommended time limits
5. **Test Integration**: Verify files play correctly in the application

## Quality Assurance Checklist

### Before Recording
- [ ] Review actual problem text in application code
- [ ] Understand target age group and difficulty level
- [ ] Prepare clear, simple explanations

### During Recording
- [ ] Use clear, friendly voice
- [ ] Speak at appropriate pace for children
- [ ] Ensure good audio quality (no background noise)
- [ ] Include appropriate pauses in explanations

### After Recording
- [ ] Convert to MP3 format at recommended quality
- [ ] Name files according to exact convention
- [ ] Test file playback in application
- [ ] Verify audio triggers work correctly
- [ ] Check integration with background music system

## Current Status

✅ **Folder Structure**: Complete (27 blocks, 270 files)
✅ **Placeholder Files**: All 270 files created with detailed instructions
⏳ **Audio Content**: Ready for replacement with actual recordings
⏳ **Quality Testing**: Pending actual audio files

**Total Files Created**: 270 placeholder files
**Ready for**: Professional Portuguese audio narration suitable for elementary students