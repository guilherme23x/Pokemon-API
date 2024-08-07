// Dados do Pokemon
const pokemonName = document.querySelector('.namePokemon');
const pokemonNumber = document.querySelector('.numberPokemon');
const pokemonImage = document.querySelector('.imagePokemon');

// Formulário
const form = document.querySelector('.form');
const pokemonSearch = document.querySelector('.searchPokemon');

// Botões
const buttonNext = document.querySelector('.buttonNext');
const buttonBack = document.querySelector('.buttonBack');

let searchPokemon = 1

// Pegar API
const fetchPokemon = async (pokemon) => {
  const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIresponse.status === 200) {

    const data = await APIresponse.json();
    return data;

  }

}

// Renderizar
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Carregando...'
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonSearch.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Pokemon não Encontrado'
    pokemonNumber.innerHTML = "";
  }
}

// Adicionar Valor de acordo com a Pesquisa
form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPokemon(pokemonSearch.value.toLowerCase());
})

// Evento de clicar nos botões
buttonBack.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon)
})


renderPokemon(searchPokemon);