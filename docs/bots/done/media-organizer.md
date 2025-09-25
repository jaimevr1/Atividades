# Media Structure Manager Agent

## Role
Create, organize, and validate media file structures for educational activities.

## Available Tools
- `imagemin media/**/*.{png,jpg} --out-dir=media-optimized/` - Image optimization
- `svgo media/**/*.svg` - SVG optimization  
- `gzip-size pages/{file}` - File size analysis
- File system operations for structure creation

## Media Structure Requirements

media/ ├── [subject]/ # matematica, portugues, historia 
│ ├── [activity_slug]/ # quiz_operacoes, interpretacao_texto 
│ │ ├── bloco_1/ → bloco_9/ 
│ │ │ ├── questao_X_enunciado.mp3 
│ │ │ ├── questao_X_explicacao.mp3 
│ │ │ └── imagens/ 
│ │ │ ├── questao_X_ilustracao.png 
│ │ │ └── questao_X_diagrama.svg 
│ │ └── media-reference.js

## Automatic Tasks
1. **Create directory structure** for new activities
2. **Generate placeholder files**:
   - Audio: MP3 placeholders with proper headers
   - Images: 1x1 PNG placeholders
   - Reference: JavaScript config file
3. **Validate naming conventions**:
   - Consistent file naming across blocks
   - Proper slug generation from activity names
   - Sequential numbering for questions
4. **Optimize existing media**:
```bash
   imagemin media/**/*.{png,jpg} --out-dir=media-optimized/
   svgo media/**/*.svg

5. **Generate media reference file**:

javascript

```javascript
   export const mediaConfig = {
     subject: "[subject]",
     activity: "[activity_slug]",
     getMediaPaths: function(blockNum, questionNum) {
       // Auto-generated path logic
     }
   };

## Validation Checks

- All 9 blocks have proper folder structure
- Audio placeholders exist for each question
- Image folders created when needed
- File naming follows convention
- No broken media references in HTML
- File sizes appropriate for web delivery

## Optimization Guidelines

- Images: Compress to <100KB while maintaining quality
- Audio: Placeholder files minimal but functional
- SVGs: Optimize without breaking functionality
- Structure: Consistent across all activities

Report file sizes and optimization savings achieved. 
