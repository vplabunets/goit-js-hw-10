import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountriesByName from './fetchCountries';
// import refs from './refs';
let _ = require('lodash');
const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;
const FAILURE_MESSAGE = 'Oops, there is no country with that name';
const NOTIFICATION_MESSAGE =
  'Too many matches found. Please enter a more specific name.';
refs.inputEl.addEventListener('input', _.debounce(onInputType, DEBOUNCE_DELAY));

function onInputType(event) {
  event.preventDefault();
  if (event.target.value !== '') {
    let inputData = event.target.value.trim();
    fetchCountriesByName(inputData)
      .then(renderCountry)
      .catch(error => console.log(error));
  } else {
    markupCleaning();
    return Notiflix.Notify.info('Нужно ввести название');
  }
}
//Markup cleaning function
function markupCleaning() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
}

//
function renderCountry(countries) {
  //Error 404 checking
  if (countries.status === 404) {
    markupCleaning();
    Notiflix.Notify.failure(FAILURE_MESSAGE);
  } else if (countries.length >= 10) {
    markupCleaning();
    //otification
    return Notiflix.Notify.info(NOTIFICATION_MESSAGE);
  } else if (countries.length >= 2 && countries.length <= 10) {
    markupCleaning();
    countriesListMarkupCreation(countries);
  } else {
    markupCleaning();
    countryInfoMarkupCreation(countries);
  }
}

function countriesListMarkupCreation(countries) {
  refs.countryListEl.innerHTML = countries
    .map(
      ({ flags, name }) =>
        `<li class="country-item"><img class="country-flag" src="${flags.svg}"
           alt="flag ${name.official}" width = "30" height ="18"> 
           <p class="country-name">${name.official}</p></li>`
    )
    .join('');
}
function countryInfoMarkupCreation(countries) {
  refs.countryInfoEl.innerHTML = countries.map(
    ({ flags, capital, population, languages, name }) =>
      `<div class="country-card"><img class="country-card__flag" src="${
        flags.svg
      }" alt="flag ${name.official}" width = "30" height ="18"> <h2> ${
        name.official
      }</h2></div>
      <ul class="country-card__list">
          <li class="country-card__item">Capital: ${capital}</li>
          <li class="country-card__item">Population: ${population}</li>
          <li class="country-card__item">Languages: ${Object.values(
            languages
          )}</li>
          </ul>
          `
  );
}
