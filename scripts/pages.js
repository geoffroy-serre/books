const MAIN_SECTION = document.getElementById('main');

function searchPage() {
  MAIN_SECTION.innerHTML = `
    <div class="search-form">
        <div class="search-form_field">
          <label for="search-title">Title: </label>
          <input id="search-title" name="search-title" type="text" placeholder="title" />
        </div>
        <div class="search-form_field">
          <label for="search-author">Author: </label>
          <input id="search-author" type="text" name="search-author" placeholder="author" />
        </div>
        <div class="search-form_field">
          <label for="search-editor">Editor: </label>
          <input id="search-editor" name="search-editor" type="text" placeholder="editor" />
        </div>
        <div class="search-parameters">
        <div>
          <label for="results-number">Max results</label>
          <select name="results-number" id="results-number">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
          </div>
          <div>
          <label for="results-language">Language</label>
          <select name="results-language" id="results-language">
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="de">Deutsh</option>
          </select>
        </div>
        </div>
        <div>
          <button onclick="searchResults(0)">Submit</button>
        </div>
      </div>
      <div id="search-results"></div>`;
}

function searchResults(currentPage = 0) {
  //When using the select menu, currentPage is sent as string.
  currentPage = parseInt(currentPage);
  const PER_PAGE_RESULTS = parseInt(document.getElementById('results-number').value);
  const SEARCH_RESULT_SECTION = document.getElementById('search-results');
  const BOOK_LIST_EL = document.createElement('div');

  BOOK_LIST_EL.classList.add('books-list');
  SEARCH_RESULT_SECTION.innerHTML = '';
  search(requestBuilder(currentPage)).then((data) => {
    const TOTAL_ITEMS = data.totalItems;
    const NUMBER_OF_PAGES = Math.ceil(TOTAL_ITEMS / PER_PAGE_RESULTS);
    BOOK_LIST_EL.innerHTML = `
    <div class="pagination">
    <span class="iconify-inline pagination-arrow" data-icon="codicon:chevron-left" onclick="searchResults(${currentPage - PER_PAGE_RESULTS})"></span>
    <select onchange="searchResults(value)">
      ${pagination(NUMBER_OF_PAGES, currentPage, PER_PAGE_RESULTS)}</select>
      <span class="iconify-inline pagination-arrow" data-icon="codicon:chevron-right" onclick="searchResults(${currentPage + PER_PAGE_RESULTS})"></span>
  <div> `;

    if (!data.items) {
      SEARCH_RESULT_SECTION.innerHTML = noResults();
    } else {
      SEARCH_RESULT_SECTION.appendChild(BOOK_LIST_EL);
      data.items.forEach((item) => {
        let isbn = 0;
        const BOOK = document.createElement('div');
        BOOK.classList.add('books-list_book');
        item.volumeInfo.industryIdentifiers.forEach((id) => {
          if (id.type === 'ISBN_13') {
            isbn = id.identifier;
          }
        });

        BOOK.innerHTML = `
        <div>
          <img src="${item.volumeInfo.imageLinks?.thumbnail ? item.volumeInfo.imageLinks.thumbnail : ''}"/>
          <div class="book-info">
            <h3>${item.volumeInfo.title ? item.volumeInfo.title : 'No title'}</h3>
            <span>ISBN: ${isbn}</span>
            <span>Auteur: ${item.volumeInfo.authors}</span>
            <span>Editeur: ${item.volumeInfo.publisher}</span>
            </div>
        </div>
        <p>${item.volumeInfo.description ? item.volumeInfo.description : 'No description'}</p>
        </div>
        `;
        BOOK_LIST_EL.appendChild(BOOK);
      });
    }
  });
}

function noResults() {
  return `
    <div class="no-results">
    <h2>No results founds</h2>
    </div>
    `;
}

function pagination(nbrOfPages, currentPage, max_results_choosen) {
  let pages = '';
  for (let i = 1; i <= nbrOfPages; i++) {
    if (max_results_choosen * (i - 1) === parseInt(currentPage)) {
      pages += `<option class="button-pagination" value="${max_results_choosen * (i - 1)}" selected>${i}</option>`;
    } else {
      pages += `<option class="button-pagination" value="${max_results_choosen * (i - 1)}">${i}</option>`;
    }
  }
  return pages;
}
