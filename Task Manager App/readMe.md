# Task Manager Web App Assignment

Build a Task Manager Web App with user authentication and CRUD operations for personal tasks using Firebase and fetch().

## 📋 Requirements

### 1. User Authentication with Firebase
- Integrate [Firebase Authentication](https://firebase.google.com/docs/auth).
- Allow users to **Sign Up** and **Login** with email & password.
- After login, store user info (UID/token) and display the Task Manager screen.
- Add a **Logout** button to sign out.

### 2. Task Manager (Post-Login)
- Show a form to **Add New Task** (title, description).
- Display all tasks for the logged-in user in a list or card view.
- Each task should have options:
    - ✅ **Mark as complete**
    - 📝 **Edit**
    - ❌ **Delete**
- Use appropriate HTTP methods (`POST`, `GET`, `PATCH`, `DELETE`) via `fetch()` to a mock API (e.g., [jsonplaceholder](https://jsonplaceholder.typicode.com/posts)) or a local server (e.g., `db.json`).

### 3. Authorization
- Only authenticated users can access the Task Manager page.
- Redirect unauthenticated users to the login page.
- Optionally, protect data based on user's UID if using Firebase Firestore/Realtime DB.

### 4. UI & Styling
- Use basic CSS or frameworks like **Tailwind** or **Bootstrap**.
- Display tasks in a card or list view.
- Show loading indicators when fetching or updating tasks.

---
### 5. Deployment

- Live Demo  [Netlify](https://task-mangerapp-demo.netlify.app/)

## 📁 Project Structure

```
Task Manager App/
│
├── dashboard.html
├── dashboard.js
├── dashboardasStyle.css
├── firebase.js
├── index.html
├── login.js
├── loginstyles.css
├── signup.html
├── signup.js
├── signupStyle.css
└── readMe.md
```

- `index.html` - Entry point, login/signup navigation.
- `login.js`, `loginstyles.css` - Login logic and styles.
- `signup.html`, `signup.js`, `signupStyle.css` - Signup page, logic, and styles.
- `dashboard.html`, `dashboard.js`, `dashboardasStyle.css` - Main task manager UI, logic, and styles.
- `firebase.js` - Firebase configuration and authentication logic.
- `readMe.md` - Project documentation.




