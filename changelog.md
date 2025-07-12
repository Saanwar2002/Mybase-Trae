# Changelog

## 2024-07-31
### Added
- Created CHANGELOG.md to track all code changes and fixes.

### Fixed
- Firebase Admin SDK initialization now throws explicit errors if the FIREBASE_SERVICE_ACCOUNT_KEY is missing or invalid.
- Removed all hardcoded Firebase API keys and fallback values from src/lib/firebase.ts; configuration now strictly requires environment variables.
- ErrorBoundary in src/components/error-boundary.tsx now prevents infinite reload loops on chunk loading errors by limiting reloads to three attempts.
- Improved error handling and fail-fast mechanisms for both Firebase client and admin SDK initialization.

### Security
- No hardcoded secrets or API keys remain in the codebase.
- All sensitive configuration is now environment-variable driven.

### Other
- General codebase review for error handling, chunk loading, and security best practices.