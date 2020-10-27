
// list of pokemons from api
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  // adds items from the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // gets all items from the list
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

  // returns json list items
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      // displays name and details
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // selects which details will be displayed
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // selects image and height from details
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // displays details in the console
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
    });
  }

  // returns previous functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// calls addListItem function
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
