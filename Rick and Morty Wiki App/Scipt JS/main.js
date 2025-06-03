
      const baseURL = "https://rickandmortyapi.com/api";
      const itemsGrid = document.querySelector(".items-gird");
      const pageInfo = document.getElementById("page-info");
      const prevBtn = document.getElementById("prev-btn");
      const nextBtn = document.getElementById("next-btn");

      let allCharacters = [];
      let currentPage = 1;
      const itemsPerPage = 6;

      async function fetchAllCharacters() {
        let url = `${baseURL}/character`;
        try {
          while (url) {
            const response = await fetch(url);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            url = data.info.next;
          }
          displayCharacters();
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      }

      function createCharacterCard(character) {
        const card = document.createElement("div");
        card.classList.add("character-card");
        card.innerHTML = `
          <a href="character.html?id=${character.id}" target="_blank" style="text-decoration: none; color: inherit;">

        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
      `;
        return card;
        3;
      }

      function displayCharacters() {
        itemsGrid.innerHTML = "";

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageCharacters = allCharacters.slice(start, end);

        pageCharacters.forEach((character) => {
          const characterCard = createCharacterCard(character);
          itemsGrid.appendChild(characterCard);
        });

        const totalPages = Math.ceil(allCharacters.length / itemsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage >= totalPages;
      }

      prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          displayCharacters();
        }
      });

      nextBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(allCharacters.length / itemsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          displayCharacters();
        }
      });

      fetchAllCharacters();
      function updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString("en-GB"); // HH:MM:SS
        const day = now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }); 

        document.getElementById("clock").textContent = `${time} ${day}`;
      }

      setInterval(updateClock, 1000);
      updateClock();

      document
        .getElementById("random-btn")
        .addEventListener("click", async () => {
          try {
            const response = await fetch(
              "https://rickandmortyapi.com/api/character"
            );
            const data = await response.json();
            const totalCharacters = data.info.count;

            const randomId = Math.floor(Math.random() * totalCharacters) + 1;
            window.open(`character.html?id=${randomId}`, "_blank");
          } catch (error) {
            alert("Failed to fetch random character.");
            console.error(error);
          }
        });

      const themeToggleBtn = document.getElementById("theme-toggle");

      // Load saved theme from localStorage
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
      }

      themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const theme = document.body.classList.contains("dark-mode")
          ? "dark"
          : "light";
        localStorage.setItem("theme", theme);
      });
    