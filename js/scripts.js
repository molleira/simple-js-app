
// list of pokemons
let pokemonList = []

let pokemonRepository = (function () {
  // let pokemonList = [
  //   {name: 'Bulbasaur', height: 0.7, types: ['grass', ' poison']},
  //   {name: 'Ivysaur', height: 1, types: ['grass', ' poison']},
  //   {name: 'Venusaur', height: 2, types: ['grass', ' poison']},
  //   {name: 'Charizard', height: 1.7, types: ['fire', ' flying']},
  //   {name: 'Butterfree', height: 1.1, types: ['bug', ' flying']}
  // ];

  // add item to list
  function add(poke) {
    pokemonList.push(poke);
  }

  // get all items in the list
  function getAll() {
    return pokemonList;
  }

  // selects <ul> and creates <li> childs
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    // creates button for each <li>, add a class and display pokemon name
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    // appends and listens to clicks
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  // displays name in the console
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  // returns previous functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

// calls getAll and adds new pokemon
pokemonRepository.getAll();
pokemonRepository.add({ name: 'Pikachu' });

// calls addListItem function
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
