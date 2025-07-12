# Code Change Rules

1. **Purposeful Changes**: Every code change must have a clear purpose (bug fix, feature, refactor, etc.) and be described in the changelog.
2. **No Hardcoded Secrets**: Never commit API keys, passwords, or sensitive data. Use environment variables for all secrets.
3. **Error Handling**: Add defensive error handling for all external calls and critical logic. Fail fast and provide clear error messages.
4. **Security**: Validate all user input, sanitize data, and follow best security practices for authentication and authorization.
5. **Code Style**: Follow the project's code style and formatting conventions (e.g., consistent indentation, naming, and comments).
6. **Testing**: Test all changes locally. Add or update tests for new features or bug fixes when possible.
7. **Documentation**: Update documentation and comments to reflect code changes, especially for public APIs and configuration.
8. **Changelog**: Log every significant change in CHANGELOG.md with a date, description, and affected files or modules.
9. **Review**: Self-review your changes for clarity, maintainability, and potential side effects before committing.
10. **No Dead Code**: Remove unused code, variables, and files to keep the codebase clean.
11. **Explain and Confirm**: Before making any code change or running any command, always explain why the change or command is necessary and ask for confirmation before proceeding.