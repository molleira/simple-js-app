
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

  // creates markup structure to display content
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let $row = $(".row");

      let $card = $('<div class="card col-sm-12 col-md-6 col-lg-4"></div>');
      let $image = $(
        '<img class="card-img-top" alt="Card image">'
      );
      $image.attr("src", pokemon.imageUrlFront);
      let $cardBody = $('<div class="card-body"></div>');
      let $cardTitle = $("<h4 class='card-title'>" + pokemon.name + "</h4>");
      let $seeProfile = $(
        '<button type="button" class="btn btn-dark" data-toggle="modal" data-target="#pokeModal">See Profile</button>'
      );

      // appends cards and it's content
      $row.append($card);
      $card.append($image);
      $card.append($cardBody);
      $cardBody.append($cardTitle);
      $cardBody.append($seeProfile);

      // listens to click to display details
      $seeProfile.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }

  // shows the pokemon's details in a modal and in the console
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      showModal(item);
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
   return $.ajax(url)
     .then(function (details) {
       // adds the details to the item
       item.imageUrlFront = details.sprites.front_default;
       item.imageUrlBack = details.sprites.back_default;
       item.height = details.height;
       // loops each pokemon types
       item.types = [];
       for (let i = 0; i < details.types.length; i++) {
         item.types.push(details.types[i].type.name);
       }
       // loop to get the abilities of a selected pokemon
       item.abilities = [];
       for (let i = 0; i < details.abilities.length; i++) {
         item.abilities.push(details.abilities[i].ability.name);
       }
       item.weight = details.weight;
     })
     .catch(function (e) {
       console.error(e);
     });
 }

 // shows the modal content
 function showModal(item) {
   let modalBody = $(".modal-body");
   let modalTitle = $(".modal-title");
   let modalHeader = $(".modal-header");
   // clears existing content of the model
   modalTitle.empty();
   modalBody.empty();

   // creates the different elements in modal content
   let nameElement = $("<h1>" + item.name + "</h1>");
   let imageElementFront = $('<img class="modal-img" style="width:50%">');
   imageElementFront.attr("src", item.imageUrlFront);
   let imageElementBack = $('<img class="modal-img" style="width:50%">');
   imageElementBack.attr("src", item.imageUrlBack);
   let heightElement = $("<p>" + "height : " + item.height + "</p>");
   let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
   let typesElement = $("<p>" + "types : " + item.types + "</p>");
   let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

   // appends the different elements in modal content
   modalTitle.append(nameElement);
   modalBody.append(imageElementFront);
   modalBody.append(imageElementBack);
   modalBody.append(heightElement);
   modalBody.append(weightElement);
   modalBody.append(typesElement);
   modalBody.append(abilitiesElement);
 }

  // returns previous functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

// calls addListItem function
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
