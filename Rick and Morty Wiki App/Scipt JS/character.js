
    function getCharacterIdFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
    }

    async function fetchCharacterDetails(id) {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const character = await response.json();

        const origin = character.origin?.name || 'Unknown';
        const location = character.location?.name || 'Unknown';
        const episodes = character.episode?.length || 0;

        document.getElementById('character-detail').innerHTML = `
          <img src="${character.image}" alt="${character.name}" />
          <h1>${character.name}</h1>
          <p><strong>Status:</strong> ${character.status}</p>
          <p><strong>Species:</strong> ${character.species}</p>
          <p><strong>Type:</strong> ${character.type || 'N/A'}</p>
          <p><strong>Gender:</strong> ${character.gender}</p>
          <p><strong>Origin:</strong> ${origin}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Episodes:</strong> ${episodes} episode(s)</p>
        `;
      } catch (error) {
        document.getElementById('character-detail').innerHTML = 'Failed to load character details.';
        console.error('Error:', error);
      }
    }

    function updateClock() {
      const now = new Date();
      const time = now.toLocaleTimeString('en-GB');
      const day = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      document.getElementById('clock').textContent = `${time} ${day}`;
    }

    setInterval(updateClock, 1000);
    updateClock();

    const characterId = getCharacterIdFromURL();
    if (characterId) {
      fetchCharacterDetails(characterId);
    } else {
      document.getElementById('character-detail').textContent = 'No character ID provided in the URL.';
    }
 