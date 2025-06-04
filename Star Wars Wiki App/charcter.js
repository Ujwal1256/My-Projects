function getCharacterIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fetchCharacterDetails(id) {
  try {
    const response = await fetch(
      `https://akabab.github.io/starwars-api/api/id/${id}.json`
    );
    const character = await response.json();
    console.log(character);
    const origin = character.origin?.name || "Unknown";
    const location = character.location?.name || "Unknown";
    const episodes = character.episode?.length || 0;

    document.getElementById("character-detail").innerHTML = `
  <h1>${character.name}</h1>
  <img src="${character.image}" alt="${character.name}" />
  <p>Gender : ${character.gender}</p>
  <p>Species : ${character.species || "Unknown"}</p>
  <p>Homeworld : ${character.homeworld}</p>
  <p><strong>Affiliations:</strong></p>
  ${
    Array.isArray(character.affiliations) && character.affiliations.length
      ? `<ul>${character.affiliations
          .map((item) => `<li>${item}</li>`)
          .join("")}</ul>`
      : `<p>None</p>`
  }
  <p>Height : ${character.height}</p>
  <p>Mass : ${character.mass}</p>
  <p>Eye Color : ${character.eyeColor || "Unknown"}</p>
  <p>Hair Color : ${character.hairColor || "Unknown"}</p>
  <p><strong>Skin Color:</strong> ${character.skinColor || "Unknown"}</p>
`;
  } catch (error) {
    document.getElementById("character-detail").innerHTML =
      "Failed to load character details.";
    console.error("Error:", error);
  }
}

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
updateClock();

const characterId = getCharacterIdFromURL();
if (characterId) {
  fetchCharacterDetails(characterId);
} else {
  document.getElementById("character-detail").textContent =
    "No character ID provided in the URL.";
}
