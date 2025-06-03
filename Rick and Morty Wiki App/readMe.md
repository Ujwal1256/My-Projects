# Rick and Morty Wiki Application

## Project Description

The **Rick and Morty Wiki Application** is a web-based character encyclopedia built using the [Rick and Morty API](https://rickandmortyapi.com/). Users can browse characters in a paginated grid, view detailed information about each character in a separate page, and enjoy a live-updating clock footer. This project demonstrates asynchronous data fetching, responsive design, and client-side routing for detailed views.

### Key Features

- **Character Gallery**: Displays six characters per page in a 3×2 grid layout.
- **Pagination**: “Next” and “Previous” buttons to navigate through all available characters.
- **Character Card**:
  - Image
  - Name
  - Species
  - Status (Alive, Dead, Unknown)
  - Clickable link that opens a detail view in a new tab.
- **Character Details Page**:
  - Full-size image
  - Name, Status, Species, Type, Gender
  - Origin location & Current location
  - Episode appearances (count)
- **Live-Updating Footer Clock**: Shows current time in format `HH:MM:SS Day Date` (e.g., “14:30:45 Friday March 17, 2025”).
- **Optional Enhancements**:
  - Dark/Light theme toggle
  - “Random Character” button

---

## Table of Contents

1. [Demo & Deployed Link](#demo--deployed-link)
2. [Tech Stack](#tech-stack)
3. [Setup & Installation](#setup--installation)
4. [Screenshots](#screenshots)
5. [Challenges Faced](#challenges-faced)

---

## Demo & Deployed Link

A live version of this application is deployed and can be accessed here:  
**[Deployed Rick and Morty Wiki App](https://rick-and-mort-app.netlify.app)**

---

## Tech Stack

- **Frontend**:
  - HTML5 & CSS3 (Flexbox / Grid)
  - JavaScript
- **API**: [Rick and Morty API]('https://rickandmortyapi.com/api/character')
- **Styling**:
  - Responsive design via media queries
- **Deployment**:
- Netlify

---

## Setup & Installation

- Run index.html file from any browser

### Prerequisites

- A modern browser (Chrome, Firefox, Edge, Safari)

## Screenshots

![alt text](<Screenshot 2025-06-03 195332.png>)
![alt text](<Screenshot 2025-06-03 195250.png>)
![alt text](<Screenshot 2025-06-03 195304.png>)
![alt text](<Screenshot 2025-06-03 195318.png>)
![alt text](<Screenshot 2025-06-03 195356.png>)

## Challenges Faced

### 1. **Handling Asynchronous API Calls**

Working with the `fetch()` API to retrieve character data and dynamically populate the page was initially tricky. It required properly chaining `.then()` methods and handling loading/error states manually without any framework like React.

### 2. **Pagination Logic**

Implementing "Next" and "Previous" functionality required maintaining the current page state and updating the API query accordingly. I had to ensure that pagination didn’t go below page 1 or exceed the total number of pages returned from the API.

### 3. **Responsive Design**

Designing a 3×2 grid layout that remains responsive on various devices was a challenge. I used CSS Grid with media queries to ensure the layout adjusts cleanly on smaller screens (e.g., 2×3 or 1×6 layouts on phones).

### 4. **Opening Details in New Tab**

Instead of using frameworks with built-in routing, I had to manually handle navigation by passing the character ID through the URL and reading it on the detail page with `URLSearchParams`.

### 5. **Live Footer Clock**

Creating a live-updating clock in vanilla JavaScript required using `setInterval()` and formatting the time/date manually with built-in `Date` methods. Ensuring it works on both pages consistently required writing reusable time logic.
