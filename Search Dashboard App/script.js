const firstNames = [
  "Alex",
  "Sam",
  "Chris",
  "Taylor",
  "Jordan",
  "Morgan",
  "Casey",
  "Jamie",
  "Robin",
  "Drew",
  "Pat",
  "Lee",
  "Dana",
  "Sky",
  "Riley",
  "Quinn",
  "Avery",
  "Jesse",
  "Cameron",
  "Harley",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Martinez",
  "Lopez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
];
const names = [];
for (let i = 0; i < 250; i++) {
  const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
  const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
  names.push(`${fn} ${ln}`);
}

const searchBox = document.getElementById("searchBox");
const resultsList = document.getElementById("results");
const keystrokesSpan = document.getElementById("keystrokes");
const debouncedCountSpan = document.getElementById("debouncedCount");
const loader = document.getElementById("loader");
const noResults = document.getElementById("noResults");
const backToTopBtn = document.getElementById("backToTop");

let keystrokes = 0;
let debouncedCount = 0;

// Debounce function
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    loader.style.display = "block";
    clearTimeout(timer);
    timer = setTimeout(() => {
      loader.style.display = "none";
      fn.apply(this, args);
    }, delay);
  };
}

// Throttle function
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Highlight matched part
function highlightMatch(name, query) {
  if (!query) return name;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "ig"
  );
  return name.replace(regex, '<span class="highlight">$1</span>');
}

// Search function
function searchNames() {
  debouncedCount++;
  debouncedCountSpan.textContent = debouncedCount;
  const query = searchBox.value.trim();
  resultsList.innerHTML = "";
  noResults.style.display = "none";
  if (!query) {
    return;
  }
  const matches = names.filter((n) =>
    n.toLowerCase().includes(query.toLowerCase())
  );
  if (matches.length === 0) {
    noResults.style.display = "block";
    return;
  }
  const fragment = document.createDocumentFragment();
  matches.forEach((name) => {
    const li = document.createElement("li");
    li.innerHTML = highlightMatch(name, query);
    fragment.appendChild(li);
  });
  resultsList.appendChild(fragment);
}

// Debounced search
const debouncedSearch = debounce(searchNames, 1000);

// Input event
searchBox.addEventListener("input", () => {
  keystrokes++;
  keystrokesSpan.textContent = keystrokes;
  loader.style.display = "block";
  debouncedSearch();
});

function handleScroll() {
  if (window.scrollY >= 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}
window.addEventListener("scroll", throttle(handleScroll, 500));

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

searchBox.focus();
