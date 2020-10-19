let pokemonList = [
  {name: 'Bulbasaur', height: 0.7, types: ['grass', ' poison']},
  {name: 'Ivysaur', height: 1, types: ['grass', ' poison']},
  {name: 'Venusaur', height: 2, types: ['grass', ' poison']},
  {name: 'Charizard', height: 1.7, types: ['fire', ' flying']},
  {name: 'Butterfree', height: 1.1, types: ['bug', ' flying']}
];

// // displays name and height of each object of the array
// for (let i = 0; i < pokemonList.length; i++) {
//     document.write(pokemonList[i].name);
//     // higlights biggest pokemon from the array with a condition
//     if (pokemonList[i].height > 1.8) {
//       document.write(' (height: ' + pokemonList[i].height + ') - Wow, that’s big!</br>')
//     }
//     else {
//       document.write(' (height: ' + pokemonList[i].height + ')</br>')
//     }
// }

pokemonList.forEach(function(poke) {
  document.write(poke.name + ': ' + poke.height + ' - ' + poke.types + '<br>');
});
