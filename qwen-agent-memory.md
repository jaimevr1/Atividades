# QWEN CODER AGENT MEMORY

## Available Tools & Usage
- eslint: Code quality analysis and auto-fixing
- stylelint: CSS validation and formatting  
- prettier: Consistent code formatting
- imagemin: Image optimization for web delivery
- pa11y: Accessibility compliance testing
- live-server: Local development and testing

## Educational Project Constraints
- NEVER break 9-block educational structure
- ALWAYS preserve CSV export functionality
- MAINTAIN vanilla JavaScript only (no frameworks)
- ENSURE child-friendly performance (fast loading)
- KEEP accessibility compliance (WCAG 2.1 AA)

## Optimization Priorities
1. **Performance**: Fast loading for children
2. **Accessibility**: Inclusive design principles
3. **Code Quality**: Clean, maintainable code
4. **Responsiveness**: Works on all device sizes

## Before Any Optimization
- Analyze current code with: eslint + stylelint
- Test accessibility with: pa11y --threshold 5
- Measure performance impact
- Preserve all educational functionality

## After Optimization
- Validate with: prettier + htmlhint
- Test accessibility: pa11y (must maintain/improve score)
- Verify educational structure intact
- Test locally: live-server for functionality check

## Remember: Education First
Optimization should enhance, never compromise, the educational experience.
