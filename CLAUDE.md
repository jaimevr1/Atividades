# Do not use mcp playwright it has a issue that i will solve

# AGENT INVOCATION PROTOCOLS

## INVOCATION SEQUENCE
Primary adaptation by Claude Code -> educational-question-extractor -> js-web-debugger -> frontend-quiz-developer -> edu-project-manager (if needed)

## educational-question-extractor

### Trigger Conditions
- After completing initial .tsx to HTML adaptation
- Educational content requires pedagogical validation
- Difficulty progression needs verification
- Content quality assessment needed

### Invocation Template
```
Content Reviewer Agent Required

Task: Analyze educational activity for pedagogical compliance
Subject: [Mathematics/Portuguese/History]
Target Audience: [age group]
Activity Type: [quiz/game/interactive exercise]

Code to Review:
[Insert complete HTML file]

Validation Requirements:
- Difficulty progression between questions
- Instruction clarity
- Educational feedback quality
- Target audience appropriateness
- Conceptual consistency

Expected Output: Structured report with quality score and specific improvement recommendations
```

### Expected Response Processing
- Review pedagogical assessment report
- Identify content issues requiring correction
- If issues found: invoke Technical Developer for implementation
- If approved: proceed to next validation step

## js-web-debugger

### Trigger Conditions
- Console errors detected
- Performance issues identified
- Cross-browser compatibility problems
- Unexpected behavior during testing
- Memory leaks or resource issues

### Invocation Template
```
Debug Specialist Agent Required

Problem Description: [Specific error or behavior]
Expected Behavior: [What should happen]
Browser Environment: [Chrome/Firefox/Safari/Edge]
Console Errors: [Exact error messages if any]

Reproduction Steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Problematic Code Section:
[Insert relevant code or full HTML file]

Expected Output: Root cause diagnosis and corrected code implementation
```

### Expected Response Processing
- Implement provided bug fixes
- Test corrected functionality
- Validate performance improvements
- Document changes made

## Tfrontend-quiz-developer

### Trigger Conditions
- Additional features requested beyond basic adaptation
- Performance optimizations needed
- UI/UX improvements required
- New functionality implementation
- After Debug Specialist resolves critical issues

### Invocation Template
```
Technical Developer Agent Required

Feature Request: [Specific functionality needed]
Current Implementation: [Describe existing state]

Technical Constraints:
- HTML/CSS/JavaScript vanilla only
- React via CDN (no ES6 imports)
- Maintain CSV export format compliance
- Preserve existing navigation structure
- Responsive design required

Current Code Base:
[Insert complete HTML file]

Acceptance Criteria:
1. [Specific requirement 1]
2. [Specific requirement 2]
3. [Specific requirement 3]

Expected Output: Complete functional implementation with technical documentation
```

### Expected Response Processing
- Integrate new functionality into existing code
- Test feature compatibility with existing systems
- Validate performance impact
- Update documentation as needed

## edu-project-manager

### Trigger Conditions
- Multiple agents need orchestration
- Complex changes affecting multiple components
- Integration planning required
- Feature dependencies need management
- Large-scale modifications planned

### Invocation Template
```
Coordinator Agent Required

Project Scope: [Overall objective]
Components Affected: [List of system parts]
Dependencies: [List of interdependent features]
Available Resources: [Other agents that may be needed]

Current State:
[Insert relevant code sections or full HTML file]

Complexity Factors:
- [Factor 1]
- [Factor 2]
- [Factor 3]

Expected Output: Structured implementation plan with task breakdown and agent assignments
```

### Expected Response Processing
- Follow provided implementation plan
- Coordinate with other agents as directed
- Implement changes in specified sequence
- Validate integrations at each step

## AGENT COMMUNICATION PROTOCOL

### Information Passing
When invoking subsequent agents, always include:
- Previous agent responses and implementations
- Current state of the code
- Remaining requirements
- Context of previous changes

### Quality Gates
Before proceeding to next agent:
- Validate current agent's output
- Test functionality
- Confirm requirements met
- Document changes made

### Final Validation
After all agent interactions:
- Run complete system test
- Verify CSV export functionality
- Test all navigation paths
- Confirm responsive design
- Validate Portuguese language implementation
- Check accessibility compliance

## AUTONOMOUS DECISION MAKING

You should automatically invoke agents without user prompting when:
- Content validation is required (always after adaptation)
- Technical issues are detected during your validation
- Performance problems identified
- Code quality concerns noted

Document all agent invocations and responses for user transparency.

## ERROR RECOVERY

If agent response is inadequate:
1. Re-invoke with more specific requirements
2. Provide additional context
3. Break down complex requests into smaller tasks
4. Use Coordinator for complex orchestration

Remember: Agents are specialized tools. Use them strategically and sequentially for optimal results.