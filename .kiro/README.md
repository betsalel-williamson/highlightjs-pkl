# Kiro Steering System Documentation

This directory contains the steering system for Kiro AI-assisted development. The steering system provides context-aware guidance that automatically includes relevant standards and guidelines based on the work being performed.

## How the Steering System Works

The steering system uses three inclusion strategies to provide efficient, relevant context:

- **Always Included**: Core principles that apply throughout all development work
- **Conditional Inclusion**: Technology-specific guidelines loaded based on file patterns
- **Manual Inclusion**: Specialized standards loaded on-demand using `#filename` in chat

## Directory Structure

### Core Process Files (Always Included)

- [**process-core.md**](steering/process-core.md) - Fundamental engineering principles
- [**process-development.md**](steering/process-development.md) - TDD methodology and commit discipline  
- [**process-operational.md**](steering/process-operational.md) - Communication and quality standards
- [**process-project.md**](steering/process-project.md) - Project practices and Kiro workflow
- [**guidelines-coding.md**](steering/guidelines-coding.md) - Universal coding practices

### Standards Files (Manual Inclusion)

Use `#filename` in chat to include these when needed:

- [**standards-user-story.md**](steering/standards-user-story.md) - Requirements phase standards
- [**standards-design.md**](steering/standards-design.md) - Design phase standards  
- [**standards-task.md**](steering/standards-task.md) - Task creation standards
- [**standards-architecture.md**](steering/standards-architecture.md) - System architecture documentation
- [**standards-decision.md**](steering/standards-decision.md) - Architecture Decision Records (ADRs)

### Technology Guidelines (Conditional Inclusion)

Automatically loaded based on file types being worked on. These are titled `guidelines-X.md`.

### Detailed Guidelines Directory

The [**guidelines/{category}**](guidelines/) directory contains organized, detailed guidelines referenced by the steering files:

## Spec Workflow

The steering system supports Kiro's spec-driven development workflow:

1. **Requirements** - Use `#standards-user-story` for user story standards
2. **Design** - Use `#standards-design` for technical design standards
3. **Tasks** - Use `#standards-task` for implementation task standards
4. **Implementation** - Technology guidelines auto-load based on file types
5. **Review** - Use `#guidelines-verification-protocol` for quality validation

## Usage Examples

```bash
# Working on requirements
"Let's create requirements for user authentication #standards-user-story"

# Working on TypeScript implementation  
# (guidelines-typescript.md automatically included when editing .ts files)

# Need architecture decision
"Should we use microservices? #standards-decision #standards-architecture"

# Working on verification and quality checks
"Need to validate code quality #guidelines-verification-protocol"
```

## Acknowledgements

This steering system and development methodology draws from established practices and thought leaders in software development:

### Spec-Driven Development

- **Pierce Boggan & Harald Kirschner** - Virtual workshop on spec-driven development  
  [Microsoft Build Session BRK102](https://build.microsoft.com/en-US/sessions/BRK102)
- **Vivek Haldar** - Musings on spec-driven development  
  [Spec-Driven Vibe Coding](https://vivekhaldar.com/articles/spec-driven-vibe-coding/)

### Test-Driven Development & Code Quality

- **Kent Beck** - Test-Driven Development (TDD) and "Tidy First" methodologies  
  [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes?open=false#§appendix-system-prompt)
- **Paul Hammond** - Comprehensive development practices and AI collaboration patterns  
  [Claude Configuration](https://github.com/citypaul/.dotfiles/blob/main/claude/.claude/CLAUDE.md)

### Engineering Principles

The core engineering principles synthesize best practices from:

- Continuous delivery and DevOps methodologies
- Domain-driven design patterns
- Functional programming principles
- Modern software architecture patterns

These influences have been adapted and integrated to create a cohesive system for AI-assisted development that maintains high code quality while enabling rapid, iterative progress.
