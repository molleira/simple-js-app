
// list of pokemons from api
let pokemonRepository = (function() {

  let modalContainer = document.querySelector('#modal-container');

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

  // displays details in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (){

      // clears existing modal content
      modalContainer.innerHTML = '';

      // creates a div with class modal inside modal-container
      let modal = document.createElement('div');
      modal.classList.add('modal');

      // creates a button with class modal-close and close text
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';

      // listens to a click to close the modal
      closeButtonElement.addEventListener('click', hideModal);

      // creates a title in the modal
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      // creates a text in the model
      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height: ' + pokemon.height;

      // creates an image in the modal
      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;

      // appends the different elements of the modal
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    });
  }

  // hides the modal removing the class is-visible
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // listens for escape key to close the modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // listens to click outside the modal to close it
  modalContainer.addEventListener('click', (e) => {
    // since this is also triggered when clicking INSIDE the modal
    // we only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
