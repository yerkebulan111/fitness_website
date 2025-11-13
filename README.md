# 🦅 Eagle Fitness Website

### Final Project – WEB Technologies I (Front-End)

**Team Name:** Eagle  
**Hosted Link:** https://yerkebulan111.github.io/fitness_website/

---

## 📖 Project Overview

**Eagle Fitness Website** is a modern and responsive web application designed to help users explore fitness programs, browse merchandise, discover trainers, and interact with fitness-related content.  
It now includes a complete **LocalStorage-based authentication system**, ensuring a personalized and dynamic user experience.

---

## 🎯 Features

### 🌐 1. Responsiveness
- Fully responsive layout that adapts to desktop, tablet, and mobile devices.  
- Flexible grid and media queries ensure optimal viewing across all screen sizes.

### ☀️🌙 2. Light & Dark Modes
- Users can easily switch between light and dark modes.
- Theme preference is stored in **localStorage** to maintain consistency.

### 🔐 3. Authentication System (NEW)
A fully functional **Log In + Sign Up system** built using **LocalStorage**:

- Users can **create an account** via the Sign Up page.
- User credentials (email + password) are securely stored in **localStorage**.
- Includes **form validation**:
  - Valid email format  
  - Password requirements  
  - Prevents duplicate accounts
- Log In page verifies credentials from localStorage.
- Displays logged-in username on supported pages.
- Saves login state so the user stays signed in until manually logged out.

### 🔎 4. Search & Filter System
- Search and filter features available in program and merchandise sections.
- Results and filters are stored locally for user convenience.

### 💬 5. API Integration
- Uses `fetch()` to dynamically retrieve or send data.
- Validates form input and stores messages/responses in `localStorage`.

### 💪 6. Fitness Program API
- Fetches workout-related data from an **external API**.
- Renders programs dynamically using `programs.js`.

### 🧠 7. Accessibility & UI Enhancements
- Keyboard navigation support (`keyboard-nav.js`).
- Scroll progress indicator.
- Smooth animations and transitions.

---

## 🧩 Tech Stack

| Category | Technologies Used |
|-----------|------------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **Styling** | Flexbox, Grid, Media Queries |
| **Storage** | LocalStorage API |
| **API** | External Fitness API |
| **Hosting** | GitHub Pages |

---

## ⚙️ Installation & Usage

1. Clone this repository:
```bash
   git clone https://github.com/yerkebulan111/fitness_website.git
```
2. Open index.html in your browser.

3. Explore different pages:

- Sign Up 

- Log In

- Home

- Programs

- Trainers

- Our Merch

- About Us

- Contact

---
