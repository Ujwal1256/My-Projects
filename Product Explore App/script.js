const apiUrl = "https://fakestoreapi.com/products";
const productContainer = document.querySelector(".product-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNo = document.getElementById("page-no");
const sortDropdown = document.querySelector(".sort-dropdown");
const categoryFiltersDiv = document.querySelector(".category-filters");
const searchInput = document.querySelector(".search-input");

const ITEMS_PER_PAGE = 8;
let allProducts = [];
let filteredProducts = [];
let categories = [];
let currentPage = 1;
let totalPages = 1;
let selectedSort = "";
let selectedCategories = [];
let searchTerm = "";

// Persist state in localStorage
function saveState() {
  localStorage.setItem(
    "productExplorerState",
    JSON.stringify({
      currentPage,
      selectedSort,
      selectedCategories,
      searchTerm,
    })
  );
}
function loadState() {
  const state = JSON.parse(
    localStorage.getItem("productExplorerState") || "{}"
  );
  currentPage = state.currentPage || 1;
  selectedSort = state.selectedSort || "";
  selectedCategories = state.selectedCategories || [];
  searchTerm = state.searchTerm || "";
}

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    allProducts = await response.json();
    categories = Array.from(new Set(allProducts.map((p) => p.category)));
    renderCategoryFilters();
    applyFiltersAndSorting();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function renderCategoryFilters() {
  categoryFiltersDiv.innerHTML = "";
  categories.forEach((cat) => {
    const id = "cat-" + cat.replace(/\s+/g, "-");
    const label = document.createElement("label");
    label.innerHTML = `
                    <input type="checkbox" value="${cat}" ${
      selectedCategories.includes(cat) ? "checked" : ""
    }>
                    ${cat}
                `;
    categoryFiltersDiv.appendChild(label);
  });
}

function applyFiltersAndSorting() {
  // Filter
  filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  // Sort
  if (selectedSort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "title-asc") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  }
  // Pagination
  totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;
  displayProducts();
  saveState();
}

function displayProducts() {
  productContainer.innerHTML = "";
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageProducts = filteredProducts.slice(start, end);

  if (pageProducts.length === 0) {
    productContainer.innerHTML =
      "<p style='grid-column: 1/-1; text-align:center;'>No products found.</p>";
  } else {
    pageProducts.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
                        <h2>${product.title}</h2>
                        <img src="${product.image}" alt="${product.title}">
                        <p>Price: $${product.price}</p>
                        <p>Category: ${product.category}</p>
                    `;
      productContainer.appendChild(productDiv);
    });
  }
  pageNo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
    saveState();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts();
    saveState();
  }
});

sortDropdown.addEventListener("change", (e) => {
  selectedSort = e.target.value;
  currentPage = 1;
  applyFiltersAndSorting();
});

categoryFiltersDiv.addEventListener("change", (e) => {
  if (e.target.tagName === "INPUT") {
    const value = e.target.value;
    if (e.target.checked) {
      selectedCategories.push(value);
    } else {
      selectedCategories = selectedCategories.filter((cat) => cat !== value);
    }
    currentPage = 1;
    applyFiltersAndSorting();
  }
});

// Debounced search
let searchTimeout;
searchInput.addEventListener("input", (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchTerm = e.target.value.trim();
    currentPage = 1;
    applyFiltersAndSorting();
  }, 1000);
});

// Restore state on load
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  sortDropdown.value = selectedSort;
  searchInput.value = searchTerm;
  fetchProducts();
});
