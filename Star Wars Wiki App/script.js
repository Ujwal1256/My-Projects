const itemsGrid = document.querySelector(".items-grid");
const pageInfo = document.getElementById("page-info");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const randomBtn = document.getElementById("random-btn");
const clock = document.getElementById("clock");
const themeToggle = document.getElementById("theme-toggle");

const apiUrl = "https://akabab.github.io/starwars-api/api/all.json";
let characters = [];
let currentPage = 1;
const itemsPerPage = 6;
let currentTheme = "light";

// Fetch all characters once
async function fetchCharacters() {
  try {
    const response = await fetch(apiUrl);
    characters = await response.json();
    displayCharacters();
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

// Display characters on the current page
function displayCharacters() {
  itemsGrid.innerHTML = "";
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageCharacters = characters.slice(startIndex, endIndex);

  pageCharacters.forEach((character) => {
    const link = document.createElement("a");
    link.className = "card-link";
    link.href = "character.html?id=" + character.id; // Link to character page
    link.target = "_blank";
    link.rel = "noopener";

    // Create the card container
    const card = document.createElement("div");
    card.className = "character-card";

    card.innerHTML = `
          <img src="${character.image}" alt="${character.name}" />
          <h3>${character.name}</h3>
          <p>Height: ${character.height} cm</p>
          <p>Mass: ${character.mass} kg</p>
        `;

    link.appendChild(card);
    itemsGrid.appendChild(link);
  });

  updatePageInfo();
}

// Update page info
function updatePageInfo() {
  const totalPages = Math.ceil(characters.length / itemsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Previous button
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayCharacters();
  }
});

// Next button
nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(characters.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayCharacters();
  }
});

randomBtn.addEventListener("click", () => {
  if (!characters.length) return;
  const randomIndex = Math.floor(Math.random() * characters.length);
  const randomCharacter = characters[randomIndex];
  window.open(`character.html?id=${randomCharacter.id}`, "_blank");
});

// Clock updater
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-GB");
  const day = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  document.getElementById("clock").textContent = `${time} ${day}`;
}
setInterval(updateClock, 1000);

// Toggle light/dark theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  currentTheme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";
});


fetchCharacters();
updateClock();
