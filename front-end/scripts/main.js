const SEARCH_INPUT = document.getElementById('search');
const MAIN = document.getElementById('main');

// SEARCH_INPUT.addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {
//     getSearchResults();
//   }
// });

/**
 * Get Google Books Api and return the results of the query by adding a div with :
 * image, title, description, authors and isbn13.
 * If no image is given no image is shown.
 * The result is displayed only if there is a title AND a description.
 *
 * @see searchTitle();
 */
function getSearchResults() {
  searchResults();
}

function getSearchPage() {
  searchPage();
}
/**
 * Clear main section, to append new data on a clean basis
 */
function cleanMain() {
  main.innerHTML = '';
}

function test() {
  document.getElementById('search-results').innerText = 'toto';
}
