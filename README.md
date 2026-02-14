# Frontend Quiz App 🎯

A fully responsive, interactive quiz application built with **Vanilla JavaScript**. This project focuses on asynchronous data handling, complex state management and accessible theme toggling without relying on external frameworks.

## 🚀 Overview

The goal was to build a dynamic quiz platform where users can select a subject (HTML, CSS, JS, Accessibility), answer questions, and see their score. The application handles data fetching from a local JSON file, manages the game state (current question, score, progress) and persists user preferences for dark/light mode.

## 🔗 Links

- **Live Site:** [View Live Demo](https://altindaselif.github.io/14-frontend-quiz-app/)
- **Code:** [View GitHub Repository](https://github.com/altindaselif/14-frontend-quiz-app)

## 💡 Key Features

- **⚡ Asynchronous Data Loading:** Fetches quiz data dynamically from a local JSON file.
- **🌗 Theme Switcher:** Toggles between Dark and Light modes using CSS variables and local state.
- **📊 Real-time Progress:** Visualizes quiz progression with a dynamic progress bar.
- **✅ Immediate Feedback:** Validates answers instantly and highlights correct/incorrect options.
- **📱 Responsive Interface:** Adapts layout seamlessly across Mobile, Tablet, and Desktop devices.

## 🛠️ Technical Implementation

### 1. Robust Async Data Handling

Fetching data requires careful state management to prevent runtime errors before the data is ready.

- **Solution:** Implemented the **Fetch API** within an **`async/await`** function. To prevent **race conditions**, subject selection buttons remain **disabled** by default and only unlock once the JSON data is successfully parsing and loaded into the application state.

### 2. Fragile Logic Prevention

Relying on generic text content for logic can break the application if the UI changes (e.g., adding icons or alt text).

- **Solution:** Instead of reading the entire button's text, the event listeners target specific **class names** (e.g., `.subject-option`). This decoupling ensures the logic remains **resilient** to future HTML structure changes.

### 3. Accessible DOM Manipulation

Updating the DOM frequently requires attention to semantic standards and accessibility.

- **Solution:** Utilized **semantic HTML5** elements (`<button>`, `<header>`, `<section>`) and managed **ARIA states** dynamically. Input validation prevents users from skipping questions, while visual cues (colors and icons) are managed via class toggling rather than inline styles for better maintainability.

## 📸 Screenshots

- [View Desktop Version](./desktop-screenshot.png)
- [View Tablet Version](./tablet-screenshot.png)
- [View Mobile Version](/mobile-screenshot.png)

## 🧰 Built With

- **Semantic HTML5**
- **CSS3 (Grid, Flexbox & CSS Variables)**
- **Vanilla JavaScript (ES6+, Fetch API)**
- **JSON Data Structure**
- **Mobile-First Workflow**

## ✍️ Author

- **LinkedIn:** [Elif Altındaş](https://www.linkedin.com/in/elifaltindas/)
- **Frontend Mentor:** [@altindaselif](https://www.frontendmentor.io/profile/altindaselif)
- **GitHub:** [@altindaselif](https://github.com/altindaselif)
