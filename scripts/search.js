//API CALL PARAMETERS
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const SEARCH_TERMS_QUERY = '?q=';
const LANGUAGE_QUERY = '&langRestrict=';
const MAX_RESULTS_QUERY = '&maxResults=';
const SEARCH_START_INDEX = '&startIndex=';

//SEARCH PARAMETERS WHICH USE CUSTOM MANIPULATION
const AUTHOR_QUERY = ' inauthor:';
const TITLE_QUERY = ' intitle:';
const EDITOR_QUERY = ' inpublisher:';

//DOM ELEMENTS

/**
 * @async
 * Google Books API call for volumes search
 * @param {string} finalRequest
 * @returns Array.
 *
 * @see https://developers.google.com/books/docs/v1/using#PerformingSearch
 */
async function search(finalRequest) {
  const req = await fetch(`${finalRequest}`);
  const response = await req.json();
  return response;
}

function exactSearch(exactSearch) {
  return `${SEARCH_TERMS_QUERY}"${exactSearch}"`;
}
function searchTerms(searchTerms) {}
function maxResults(maxResults) {
  return `${MAX_RESULTS_QUERY}${maxResults}`;
}
function resultsLanguage(language) {
  return `${LANGUAGE_QUERY}${language}`;
}
function searchTitle(title) {
  return `${TITLE_QUERY}${title}`;
}
function searchAuthor(author) {
  return `${AUTHOR_QUERY}${author}`;
}
function searchEditor(editor) {
  return `${EDITOR_QUERY}${editor}`;
}

function requestBuilder(page = 1) {
  const MAX_RESULTS_CHOICE = document.getElementById('results-number').value;
  const TITLE_INPUT = document.getElementById('search-title').value;
  const AUTHOR_INPUT = document.getElementById('search-author').value;
  const EDITOR_INPUT = document.getElementById('search-editor').value;
  const LANGUAGE_CHOICE = document.getElementById('results-language').value;
  let finalRequest = `${BASE_URL}${SEARCH_TERMS_QUERY}`;
  if (TITLE_INPUT) {
    finalRequest += searchTitle(TITLE_INPUT);
  }
  if (AUTHOR_INPUT) {
    finalRequest += searchAuthor(AUTHOR_INPUT);
  }
  if (EDITOR_INPUT) {
    finalRequest += searchEditor(EDITOR_INPUT);
  }
  finalRequest += maxResults(MAX_RESULTS_CHOICE);
  finalRequest += resultsLanguage(LANGUAGE_CHOICE);
  finalRequest += `${SEARCH_START_INDEX}${page}`;
  console.log(finalRequest);
  return finalRequest;
}
