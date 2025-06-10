
      const apiURL = "https://rickandmortyapi.com/api/character";
      const characterCard = document.querySelector(".characterCard");
        const searchInput = document.getElementById("searchInput");

         let characters = [];
       


        async function fetchCharacters() {
            try {
                const response = await fetch(apiURL);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                characters = data.results;
                displayCharacters(characters);
            } catch (error) {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            }
        }

     
        fetchCharacters();
   

      function displayCharacters(characters) {
        characters.forEach((character) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
                    <h2>${character.name}</h2>
                    <img src="${character.image}" alt="${character.name}">
                    <p>Species: ${character.species}</p>
                    <p>Status: ${character.status}</p>
                    <p>Location : ${character.location.name}</p>
                        `;


            if (character.status.toLowerCase() === "alive") {
                card.style.borderColor = "green";
            } else if (character.status.toLowerCase() === "dead") {
                card.style.borderColor = "red";
            } else {
                card.style.borderColor = "gray";
            }
          characterCard.appendChild(card);
        });
      }
     

       
        //Debounce the input (300ms delay)
        let debounceTimeout;
        searchInput.addEventListener("input", function () {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => { 
                const searchTerm = searchInput.value.toLowerCase();
                const cards = document.querySelectorAll(".card");
                cards.forEach((card) => {
                    const characterName = card.querySelector("h2").textContent.toLowerCase();
                    if (characterName.includes(searchTerm)) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            }, 300);
        });


        // Filter by status and soecs combine

        const statusSelect = document.getElementById("status");
        const speciesSelect = document.getElementById("species");

        function filterCharacters() {
            const selectedStatus = statusSelect.value.toLowerCase();
            const selectedSpecies = speciesSelect.value.toLowerCase();
            const cards = document.querySelectorAll(".card");

            cards.forEach((card) => {
                const characterStatus = card.querySelector("p:nth-child(4)").textContent.toLowerCase();
                const characterSpecies = card.querySelector("p:nth-child(3)").textContent.toLowerCase();

                if ((selectedStatus === "all" || characterStatus.includes(selectedStatus)) &&
                    (selectedSpecies === "all" || characterSpecies.includes(selectedSpecies))) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }
        statusSelect.addEventListener("change", filterCharacters);
        speciesSelect.addEventListener("change", filterCharacters);



        //4. Pagination Controls
        let currentPage = 1;
        const itemsPerPage = 6; 
        const prevPageButton = document.getElementById("prevPage");
        const nextPageButton = document.getElementById("nextPage");
        const pageInfo = document.getElementById("pageInfo");
       
        
        function Pagination(){
            const totalPages = Math.ceil(characters.length / itemsPerPage);
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
            characterCard.innerHTML = ""; 

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentCharacters = characters.slice(startIndex, endIndex);

            displayCharacters(currentCharacters);

            prevPageButton.disabled = currentPage === 1;
            nextPageButton.disabled = currentPage === totalPages;
        }

        prevPageButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                Pagination();
            }
        });
        nextPageButton.addEventListener("click", () => {
            const totalPages = Math.ceil(characters.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                Pagination();
            }
        });
        Pagination();
 

characterCard.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (card) {
        const cards = Array.from(characterCard.querySelectorAll(".card"));
        const cardIndex = cards.indexOf(card);

        const globalIndex = (currentPage - 1) * itemsPerPage + cardIndex;
        const character = characters[globalIndex];

        const characterId = character.id;

        const modal = document.createElement("div");
        modal.className = "charcter-modal";
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}" style="width: 100%; border-radius: 8px;">
                <p>ID: ${characterId}</p>
                <p>Species: ${character.species}</p>
                <p>Status: ${character.status}</p>
                <p>Location: ${character.location.name}</p>
                <p>Gender: ${character.gender}</p>
                <p>Origin: ${character.origin.name}</p>
                <p>Episodes: ${character.episode.length}</p>
                <p>Created: ${new Date(character.created).toLocaleDateString()}</p>
                <button id="closeModal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        const closeModalButton = document.getElementById("closeModal");
        closeModalButton.addEventListener("click", () => {
            document.body.removeChild(modal);
        });
    }
});
    