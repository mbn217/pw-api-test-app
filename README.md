# PW API Test App

## Overview
This Angular application serves as a testing platform for API interactions. It provides a simple interface to test and validate API endpoints, authentication flows, and data handling. The project includes Playwright tests for end-to-end testing of API functionality.

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- Angular CLI (v12 or later)
- Playwright (installed with project dependencies)

### Setup
1. Clone this repository:
```bash
git clone https://github.com/mbn217/pw-api-test-app.git
cd pw-api-test-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API endpoints in `src/environments/environment.ts`

## Usage

### Development Server
Run the development server:
```bash
ng serve
```
Navigate to `http://localhost:4200/` in your browser.

### Running Tests

#### Angular Tests
```bash
ng test
```

#### Playwright Tests
Run all Playwright tests:
```bash
npx playwright test
```

Run tests with UI mode for debugging:
```bash
npx playwright test --ui
```

Run specific test file:
```bash
npx playwright test tests/api-tests.spec.ts
```

View test report:
```bash
npx playwright show-report
```

## Features
- API endpoint testing
- Request/response visualization
- Authentication flow testing
- Response time metrics
- Error handling demonstration
- End-to-end API testing with Playwright

## Project Structure
- `src/app/services` - API service implementations
- `src/app/components` - UI components for testing
- `src/app/models` - Data models and interfaces
- `src/app/utils` - Utility functions for API testing
- `tests/` - Playwright test files for API validation

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License
This project is licensed under the MIT License - see the