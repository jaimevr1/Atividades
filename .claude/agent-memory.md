# Claude Code Agent Memory

## Project Context
- **Type**: Educational activities system with 9-block progression
- **Tech Stack**: Vanilla HTML/CSS/JS only (no frameworks)
- **Structure**: media/[subject]/[activity]/bloco_X/
- **Export**: CSV format with specific fields

## Available Agents
- **tsx-html-converter**: Convert React to HTML + create media structure
- **educational-content-validator**: Educational compliance validation
- **media-structure-manager**: Asset management and organization
- **debug-specialist**: Problem resolution and troubleshooting
- **performance-optimizer**: Code optimization while preserving functionality
- **accessibility-enhancer**: WCAG 2.1 AA compliance improvements
- **code-quality-analyzer**: Code quality analysis and suggestions
- **responsive-design-enhancer**: Multi-device compatibility
- **educational-tutor**: Learning content explanation and teaching

## Development Tools Available
- **htmlhint**: HTML validation
- **prettier**: Code formatting
- **eslint**: JavaScript analysis and fixes
- **pa11y**: Accessibility testing
- **live-server**: Local development server
- **imagemin**: Image optimization
- **svgo**: SVG optimization

## Qwen Integration
- **Command**: `qwen` CLI available for advanced optimizations
- **Config**: qwen-config.json with educational constraints
- **Memory**: .qwen/agent-memory.md for persistent optimization rules
- **Workflow**: Claude creates → Qwen optimizes → Agents validate

## Educational Requirements (Non-negotiable)
1. **9-block progression structure** must be preserved
2. **CSV export functionality** with fields: Nome,Materia,Atividade,Bloco,Questao,Tempo_Execucao,Acertos,Erros,Score
3. **Vanilla JS only** - no frameworks allowed
4. **Media structure**: media/[subject]/[activity]/bloco_X/
5. **Accessibility compliance** (WCAG 2.1 AA)
6. **Responsive design** for all devices
7. **Child-friendly performance** (fast loading)

## Agent Usage Guidelines
- Use **educational-content-validator** proactively for new activities
- Use **performance-optimizer** for child-friendly loading times
- Use **accessibility-enhancer** to meet WCAG standards
- Use **tsx-html-converter** when converting React components
- Use **media-structure-manager** for proper asset organization
- Use **debug-specialist** when encountering technical issues

## Quality Gates
Every deliverable must:
- Preserve educational functionality
- Maintain accessibility standards
- Support responsive design
- Keep vanilla JavaScript compatibility
- Include working CSV export
- Follow 9-block structure

## Integration Workflow
1. Analyze requirements and choose appropriate agents
2. Use agents in parallel when possible for efficiency
3. Validate educational compliance before delivery
4. Test accessibility and performance
5. Ensure media structure is properly organized
