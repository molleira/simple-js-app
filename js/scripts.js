
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
      // console.log(item);
      showModal(item);
    });
  }

  // returns previous functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// calls addListItem function
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// displays modal in the browser
function showModal(item) {
  let modalContainer = document.querySelector('#modal-container');

  // clears all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // adds the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';

  let titleElement = document.createElement('h1');
  titleElement.innerText = item.name;

  let heightElement = document.createElement('p');
  contentElement.innerText = 'Height: ' + item.height;

  let imageElement = document.createElement('img');
  imageElement.classList.add('modal-image');
  imageElement.src = item.imageUrl;

  closeButtonElement.addEventListener('click', hideModal);

  window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer){
      hideModal();
    }
  });

  modalContainer.appendChild(modal);
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(heightElement);
  modal.appendChild(imageElement);

  modalContainer.classList.add('is-visible');
}

// hides the modal
function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');

  //This is a fail-safe from the promise below if a user doesn't click "confirm" or "cancel"
  if(dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

//This function will show dialog within the "Show Dialog" modal
function showDialog(title, text){
  showModal(title, text);

  //we defined the modalContainer here
  let modalContainer = document.querySelector('#modal-container');

  //here we will add a "confirm" and "cancel" button to the modal
  let modal = modalContainer.querySelector('.modal');

  //here's the confirm button
  let confirmButton = document.createElement('button'); //created the button element
  confirmButton.classList.add('modal-confirm');         //assigned the "modal-confirm" class to the button
  confirmButton.innerText = 'Confirm';                  //the button will say "confirm"

  //Here's the cancel button
  let cancelButton = document.createElement('button'); //created the button element
  cancelButton.classList.add('modal-cancel');          //assigned the "modal-cancel" class to the button
  cancelButton.innerText = 'Cancel';                   //the button will say "cancel"

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  confirmButton.focus(); //this focuses on the confirm button so the user can just hit "enter"

  //the "confirm" and "cancel" buttons in the dialog won't work without this promise below
  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', () => {
      dialogPromiseReject = null; //reset this
      hideModal();
      resolve();
    });

    //This can be used to reject from other functions
    dialogPromiseReject = reject;
  });
}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal(item);
});

//This listens for a click on "show dialog" and opens an alert with a message
document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure want to do this?').then(function() {
    alert('Confirmed');
  }, () => {
    alert('Not Confirmed');
  });
});
