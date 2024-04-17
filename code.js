let page = 1;
let maxPage = 0;
const maxCards = 10;

async function fetchPokemons() {
    text = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${
            (page - 1) * maxCards
        }&limit=${maxCards}`
    );
    json = await text.json();
    maxPage = Math.ceil(json.count / maxCards);
    return json.results;
}

async function fetchPokemon(url) {
    text = await fetch(url);
    json = await text.json();
    return json;
}

function displayButtons() {
    pagination.innerHTML = "";

    for (i = page; i < page + maxCards; i++) {
        pagination.innerHTML += `
        <button onclick="setPage(${i})">${i}</button>
        `;
    }
}

async function displayPokemons(pokemons) {
    displayButtons();

    const results = document.getElementById("results");
    results.innerHTML = "";

    pokemons.forEach(async (pokemon) => {
        pokemonInformation = await fetchPokemon(pokemon.url);
        results.innerHTML += `
        <div class="card" id='something' onclick="toggleOnOff(this)">
            <img src="${pokemonInformation.sprites.front_default}" class="on">
            <section class="off">
                <div>${pokemonInformation.name}</div>
                <div>${pokemonInformation.id}</div>
            </section>
        </div>
        `;
    });
}

async function displayPage() {
    let pokemons = await fetchPokemons(page);
    displayPokemons(pokemons);
}

function decrementPage() {
    page--;
    displayPage();
}

function incrementPage() {
    page++;
    displayPage();
}

function setPage(num) {
    page = num;
    displayPage();
}

function toggleOnOff(element) {
    image = element.querySelector("img");
    section = element.querySelector("section");

    if (image.classList.value == "on") {
        image.classList.remove("on");
        image.classList.add("off");
        section.classList.remove("off");
        section.classList.add("on");
    } else {
        image.classList.remove("off");
        image.classList.add("on");
        section.classList.remove("on");
        section.classList.add("off");
    }
}

displayPage();
