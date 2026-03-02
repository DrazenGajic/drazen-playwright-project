# 🍊 OrangeHRM Test Automation Suite (Playwright + JS)

A high-performance automated testing framework for the OrangeHRM demo site, built with **Playwright (JavaScript)** using the **Page Object Model (POM)** pattern.

---

## 🚀 Features

* **Architecture:** Page Object Model (POM) for maximum maintainability.
* **Test Design:** Gherkin-style documentation for business clarity.
* **Reporting:** Automatic HTML,and PDF-friendly reports.
* **Artifacts:** Automated Video recording and Screenshots on test failure.
* **Cross-Browser:** Configured to run on Chromium, Firefox, and Webkit.
* **Mobile Emulation:** Includes responsive design checks for mobile viewports.

---

## 📂 Project Structure



```text
├── pages/                # Page Object classes (Selectors & Actions)
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── PIMPage.js
│   └── AdminPage.js
├── tests/                # Test specifications
│   └── orangehrm.spec.js
├── test-results/         # Screenshots, Videos, and Reports (Auto-generated)
├── playwright.config.js  # Global Playwright configuration
└── package.json          # Project dependencies

🛠️ Prerequisites
Node.js (v18 or higher)
Git installed on your system.

⚙️ Installation & Setup

Install dependencies:

Bash
npm install
Install Playwright Browsers:

Bash
npx playwright install
🧪 Running Tests
Run all tests (Headless mode)
Bash
npx playwright test
Run tests in UI Mode (Watch them run live)
Bash
npx playwright test --ui
Run a specific test file
Bash
npx playwright test tests/orangehrm.spec.js
📊 Reporting
After the tests finish, you can view the results in several formats:

HTML Report (Interactive):

Bash
npx playwright show-report
PDF report
npx monocart show-report test-results/report.html
Visual Evidence: Screenshots and videos of failed tests are stored in the test-results/ folder.

📝 Test Cases Covered (Gherkin)
Login/Logout: Valid/Invalid credentials and secure exit.

PIM Module: Adding new employees and searching by name.

Admin Module: System user search functionality.

UI/UX: Sidebar toggling and Mobile viewport responsiveness.

Password Recovery: Verification of the "Forgot Password" flow.