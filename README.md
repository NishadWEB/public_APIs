# 🌐 Public APIs Project

This project is built to **solidify backend skills** by working with **public APIs** using the **RESTful API** architecture. The primary focus is understanding how backend systems interact with third-party APIs, how data flows through endpoints, and how RESTful principles are applied in real-world use cases.

---

## 🚀 Project Objective

- Strengthen knowledge of **backend development**
- Gain hands-on experience with **RESTful APIs**
- Learn how to fetch, handle, and display data from various **public APIs**

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **Axios** 
- **JavaScript** (ES6+)
- **REST architecture principles**

---

## ✨ Features

- Fetch data from public API (weather)
- Error handling
- EJS view rendering 

---

## 📦 Installation

1. Clone the repo:
```bash
git clone https://github.com/NishadWEB/public_APIs.git 
cd public_APIs
```

2. Install dependencies:
```bash
npm install
```

## 🔐 API Key Setup

This project requires an **API key** to work with the public APIs. To keep your API key secure and private, we will store it in a `.env` file.

### Steps to set up your `.env` file:

  1. **Create a `.env` file** in the root directory of the project, where server.js is located.

  2. Add the following line to the `.env` file:
   ```env
   API_KEY=your_own_api_key_here
  ```

  3. Replace 'your_own_api_key_here' with your actual API key. You can obtain it by registering on the relevant API provider’s website(Air Quality API by IQAir) .

  4. **Ensure .env is added to your .gitignore** to prevent it from being tracked by Git and uploaded to any public repository. The .gitignorefile should already include.env`, but please verify it.

---

3. Start the server:
```bash
node server.js
```

4. Visit in browser:
http://localhost:3000 

---

Public API used :
Air Quality API by IQAir

