# Product Explorer Web App

A web application to browse, filter, sort, and paginate products using the [Fake Store API](https://fakestoreapi.com/products).

## 🚀 Features

- **Fetch & Display Products:**

  - Loads products from the Fake Store API.
  - Shows product image, title, price, and category.
  - Displays 8 products per page in a 4x2 grid.

- **Pagination:**

  - Next/Previous buttons to navigate pages.
  - Shows current page number.
  - Page number persists on reload (using localStorage or URL params).

- **Sorting:**

  - Sort by price (low to high, high to low) or alphabetically by title.
  - Sorting works with pagination and filtering.

- **Filtering:**

  - Filter products by category (e.g., men's clothing, electronics).
  - Filtering integrates with sorting and pagination.

- **Search (Bonus):**

  - Search products by title with a 1s debounce.

- **Responsive Layout:**
  - Clean, responsive UI with a 4x2 product grid per page.

## 🛠️ Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ujwal1256/My-Projects.git
   cd "Product Explore App"
   ```

2. **Open the app:**
   - Open `index.html` in any browser.

## 📦 API Reference

- **Endpoint:** `https://fakestoreapi.com/products`
- **Fields:**
  - `image`, `title`, `price`, `category`

## 📸 Screenshots

![alt text](<Screenshot 2025-06-07 215550.png>)
![alt text](<Screenshot 2025-06-07 215431.png>)
![alt text](<Screenshot 2025-06-07 215448.png>)

## 📚 Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API

## ✨ Bonus Ideas

- Product details modal
- Add to cart functionality
- Dark mode

---
