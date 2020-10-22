let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', ' poison']},
    {name: 'Ivysaur', height: 1, types: ['grass', ' poison']},
    {name: 'Venusaur', height: 2, types: ['grass', ' poison']},
    {name: 'Charizard', height: 1.7, types: ['fire', ' flying']},
    {name: 'Butterfree', height: 1.1, types: ['bug', ' flying']}
  ];

  function add(poke) {
    pokemonList.push(poke);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.getAll();
pokemonRepository.add({ name: 'Pikachu' });

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
