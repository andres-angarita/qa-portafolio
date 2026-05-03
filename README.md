# QA Portfolio — Playwright Automation

Automated test suite for [Saucedemo](https://www.saucedemo.com), a demo e-commerce app designed for QA practice. Built with Playwright and Node.js following the Page Object Model pattern.

![CI](https://github.com/andres-angarita/qa-portafolio/actions/workflows/playwright.yaml/badge.svg)

---

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation framework
- Node.js — runtime
- GitHub Actions — CI/CD pipeline

---

## Test Coverage

| Module | Tests | Scenarios |
|--------|-------|-----------|
| Auth | 4 | Valid login, invalid password, blocked user, empty fields |
| Cart | 4 | Add item, add multiple, remove, cart persistence |
| Checkout | 4 | Full flow, missing first name, last name, postal code |

---

## Project Structure

qa-portafolio/
├── pages/              # Page Object Model
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   └── CheckoutPage.js
├── tests/
│   ├── auth/
│   ├── cart/
│   └── checkout/
├── .github/workflows/  # CI/CD
└── playwright.config.js

---

## Setup

```bash
git clone https://github.com/andres-angarita/qa-portafolio.git
cd qa-portafolio
npm install
npx playwright install chromium
```

## Run Tests

```bash
# All tests
npx playwright test

# Specific module
npx playwright test tests/auth/login.spec.js

# With UI (headed mode)
npx playwright test --headed
```

---

## CI/CD

Tests run automatically on every push to `main` via GitHub Actions. Failed runs upload the Playwright HTML report as an artifact for debugging.

---

## Author

Andrés Angarita  
[LinkedIn](www.linkedin.com/in/andres-felipe-angarita-noriega-8aa47032b) · [GitHub](https://github.com/andres-angarita)