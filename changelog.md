# Changelog

All notable changes to this project will be documented in this file.

## [2024-06-09]
- Created `changelog.md` to log all project changes.
- Implemented booking creation API in `src/app/api/bookings/create/route.ts` with validation, Firestore integration, and error handling.
- Enhanced error logging in booking API for better debugging of server errors.
- Developed frontend booking form in `src/app/(app)/dashboard/book-ride/page.tsx` with validation, payment method selection, and fare estimation.
- Integrated Zod schema validation for booking form fields and custom logic for scheduled, wait & return, and priority bookings.
- Set up Firestore security rules to allow read/write until June 30, 2025.
- Added project structure files: `firebase.json`, `firestore.rules`, `firestore.indexes.json`, and configuration files for Next.js and Tailwind CSS.

---

Please add new entries above this line following the format:

## [YYYY-MM-DD]
- Description of change