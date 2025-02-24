# Cypress Automated Testing Framework 🚀  

This project is a **Cypress Automated Testing Framework** designed for end-to-end testing. It leverages **Cypress** for automation and integrates with **GitHub Actions** for CI/CD, ensuring smooth and efficient test execution.  

---

## 📌 Overview  

This project offers a fully functional, scalable **Cypress automated testing workflow** designed to enhance your end-to-end testing efforts. It includes:  

✅ **Pre-configured Cypress setup** – Ready-to-use framework with best practices included.  
✅ **GitHub Actions integration** – Automates test execution with CI/CD pipelines.  
✅ **Structured project architecture** – Organized for easy navigation and customization.  
✅ **Detailed documentation** – Guides and examples to help you get started.  

---

## 🏗️ Project Structure  

```
Cypress-main/
├── cypress/
│   ├── e2e/                # Test specifications
│   ├── fixtures/           # Test data (JSON files)
│   ├── support/            # Custom commands and test setup
├── cypress.config.js       # Cypress configuration file
├── package.json            # Dependencies & scripts
├── package-lock.json       # Lock file for dependencies
├── .github/workflows/      # CI/CD automation workflows
├── README.md               # Project documentation
├── CHANGELOG.md            # Tracks updates and changes
└── extensions.txt          # List of required browser extensions
```

---

## ⚙️ Setup & Installation  

### Prerequisites  

- **Node.js** (v16+ recommended)  
- **npm** (installed with Node.js)  

### Installation Steps  

1️⃣ Clone the Repository  

```bash
git clone https://github.com/snehaprakas1h/CypressFramework.git
cd CypressFramework
```

2️⃣ Install Dependencies  

```bash
npm install
```

---

## 🚀 Running Tests  

### Run Cypress Test Runner (GUI)  

```bash
npx cypress open
```

### Run Tests in Headless Mode  

```bash
npx cypress run
```

---

## 📝 Writing Tests  

Test cases are written in Cypress inside `.spec.js` files. Example:  

```javascript
describe('Login Test', () => {
  it('Logs in with valid credentials', () => {
    cy.visit('/login');
    cy.get('#username').type('testuser');
    cy.get('#password').type('password123');
    cy.get('#loginButton').click();
    cy.url().should('include', '/dashboard');
  });
});
```

---

## 📌 GitHub Actions Integration  

This project includes **GitHub Actions** to automate Cypress test execution:  

- **Nightly test runs** – Executes automated tests every Sunday at 1:00 AM UTC to detect regressions.  

For more details, check out the **Workflows Documentation**.  

---

## 🤝 Contributing  

Contributions are welcome! If you’d like to contribute, please follow our **Commit Message Guidelines** to maintain consistency.  

---

## 📧 Contact  

For issues, suggestions, or contributions, please raise an **issue** in this repository.
