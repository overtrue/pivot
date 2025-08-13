# CLAUDE.md - Coding Rules and Standards

## Project Overview
This document contains the coding rules and standards for this project. Follow these guidelines to maintain consistency and quality across the codebase.

## Code Style Guidelines

### General Principles
- Write clean, readable, and maintainable code
- Follow the principle of least surprise
- Prefer explicit over implicit
- Keep functions small and focused on a single responsibility
- Use meaningful names for variables, functions, and classes

### Naming Conventions
- **Variables**: Use camelCase for variables and functions
- **Constants**: Use UPPER_SNAKE_CASE for constants
- **Classes**: Use PascalCase for class names
- **Files**: Use kebab-case for file names (e.g., `user-service.ts`)
- **Directories**: Use kebab-case for directory names

### Code Formatting
- Use 2 spaces for indentation (no tabs)
- Maximum line length: 100 characters
- Use semicolons consistently
- Use single quotes for strings (unless the string contains single quotes)
- Add trailing commas in multi-line arrays and objects
- Add a newline at the end of each file

### Comments and Documentation
- Write self-documenting code with clear variable and function names
- Use JSDoc/TSDoc for public APIs and complex functions
- Add comments only when the code itself cannot explain "why" something is done
- Keep comments up to date with code changes
- Use TODO comments sparingly and include your name and date

### Error Handling
- Always handle errors gracefully
- Use try-catch blocks for operations that might fail
- Provide meaningful error messages to users
- Log errors appropriately for debugging
- Never swallow exceptions silently

### Security
- Never commit secrets, API keys, or passwords to version control
- Validate all user inputs
- Use parameterized queries to prevent SQL injection
- Sanitize data before displaying in UI
- Follow the principle of least privilege

### Testing
- Write tests for all new features
- Aim for high test coverage (minimum 80%)
- Use descriptive test names that explain what is being tested
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies appropriately

### Git Commit Messages
- Use conventional commit format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Keep the first line under 50 characters
- Use present tense ("add feature" not "added feature")
- Reference issue numbers when applicable

### File Organization
- Group related functionality together
- Keep file sizes manageable (prefer under 300 lines)
- Use index files for clean exports
- Separate concerns: keep business logic separate from presentation
- Use consistent file structure across modules

### Technology-Specific Rules

#### JavaScript/TypeScript
- Prefer TypeScript for new code
- Use strict mode
- Avoid `any` type in TypeScript
- Use async/await over callbacks
- Destructure objects and arrays when appropriate
- Use const/let instead of var

#### React
- Use functional components with hooks
- Follow React best practices for performance (useMemo, useCallback)
- Keep components small and focused
- Use TypeScript for prop types
- Follow accessibility best practices (ARIA attributes, keyboard navigation)

#### CSS/Styling
- Use CSS modules or styled-components
- Follow BEM naming convention for CSS classes
- Mobile-first responsive design
- Use CSS custom properties for theming
- Avoid inline styles except for dynamic values

### Code Review Guidelines
- Review your own code before submitting PRs
- Check for security vulnerabilities
- Ensure tests pass and coverage is adequate
- Verify accessibility standards are met
- Confirm documentation is updated
- Test edge cases and error scenarios

### Performance
- Optimize for readability first, then performance
- Use lazy loading for large components
- Minimize bundle size with code splitting
- Cache expensive computations
- Profile before optimizing

### Accessibility
- Follow WCAG 2.1 guidelines
- Ensure keyboard navigation works for all interactive elements
- Provide alt text for images
- Use semantic HTML elements
- Test with screen readers

## Development Workflow

### Before Starting Work
1. Pull latest changes from main branch
2. Create a feature branch from main
3. Write tests for new functionality first (TDD approach)

### During Development
1. Write clean, tested code
2. Commit frequently with meaningful messages
3. Run tests locally before pushing
4. Keep PRs small and focused

### Before Submitting PR
1. Run full test suite
2. Update documentation if needed
3. Review your own code
4. Ensure CI passes
5. Add screenshots for UI changes

### PR Review Process
1. Address all feedback promptly
2. Keep conversations focused and respectful
3. Update branch with latest main
4. Squash commits if requested

## Common Patterns

### Error Handling Pattern
```javascript
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Operation failed:', error);
  return { success: false, error: error.message };
}
```

### API Response Pattern
```javascript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### Configuration Pattern
```javascript
const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  timeout: parseInt(process.env.API_TIMEOUT || '5000'),
  isDevelopment: process.env.NODE_ENV === 'development',
};
```

## Tools and Commands

### Development Commands
```bash
# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Type checking (TypeScript)
npm run type-check

# Build for production
npm run build
```

### VS Code Extensions
- ESLint
- Prettier
- TypeScript
- GitLens
- Auto Rename Tag
- Bracket Pair Colorizer

## Getting Help
- Check existing documentation first
- Search closed issues and PRs
- Ask questions in team channels
- Create detailed issue reports with reproduction steps

Remember: These rules are guidelines, not rigid requirements. Use your best judgment and discuss with the team when exceptions make sense.