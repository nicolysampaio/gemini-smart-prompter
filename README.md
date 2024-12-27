# Gemini Smart Prompter

API for managing prompt templates with integration to Google's Gemini API!

## TO-DO

- [x] Day 01: Basic application setup + Gemini integration
- [x] Day 02: Save prompts and set up the test environment
- [ ] Day 03: Creating CRUD for categories and unit tests with mocks
- [ ] Day 04: Writing integration tests
- [ ] Day 05: Categorizing prompts
- [ ] Day 06: Adding Swagger documentation
- [ ] Day 07: Continuous integration with GitHub Actions

## Day 1

- Initialized a new Node.js project with TypeScript.
- Configured TypeScript with `tsconfig.json`.
- Set up Express server in `src/index.ts`.
- Integrated Google Generative AI with the Gemini model.
- Added environment variable support using dotenv.
- Added `.gitignore` to exclude `node_modules` and `.env` files.

## Day 2

- Created `TemplateService` with methods for CRUD operations.
- Created `TemplateController` to handle HTTP requests for templates.
- Set up routes for template operations in `src/routes/template.routes.ts`.
- Configured Jest for testing with `jest.config.js`.
- Added MongoDB in-memory server for testing.
- Added unit tests for `Template` model in `test/models/template.model.test.ts`.
