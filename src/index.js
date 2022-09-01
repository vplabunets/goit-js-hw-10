import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountriesByName from './fetchCountries';
import refs from './refs';
let _ = require('lodash');
const DEBOUNCE_DELAY = 300;
const FAILURE_MESSAGE = 'Oops, there is no country with that name';
const NOTIFICATION_MESSAGE =
  'Too many matches found. Please enter a more specific name.';
refs().inputEl.addEventListener(
  'input',
  _.debounce(onInputType, DEBOUNCE_DELAY)
);

function onInputType(event) {
  event.preventDefault();
  if (event.target.value !== '') {
    let inputData = event.target.value.trim();
    fetchCountriesByName(inputData)
      .then(renderCountry)
      .catch(error => console.log(error));
  } else {
    refs().countryInfoEl.innerHTML = '';
    return Notiflix.Notify.info('Нужно ввести название');
  }
}

function renderCountry(countries) {
  // let { flags, capital, population, languages, name } = countries;
  for (let key of countries) {
    // console.log(key);
  }
  // console.log(countries);
  console.log(countries);
  console.log(typeof countries);

  if (countries.status === 404) {
    refs().countryInfoEl.innerHTML = '';
    Notiflix.Notify.failure(FAILURE_MESSAGE);
  } else if (countries.length >= 10) {
    refs().countryInfoEl.innerHTML = '';
    return Notiflix.Notify.info(NOTIFICATION_MESSAGE);
  } else if (countries.length >= 2 && countries.length <= 10) {
    // console.log(countries);
    // console.log(typeof countries);
    refs().countryInfoEl.innerHTML = countries
      .map(
        ({ flags, name }) =>
          `<li class="country-item"><img class="country-flag" src="${flags.svg}"
           alt="flag ${name.official}" width = "30" height ="18"> 
           <p class="country-name">${name.official}</p></li>`
      )
      .join('');
    // console.log(markup);

    // refs().countryInfoEl.innerHTML = markup;
  } else {
    refs().countryInfoEl.innerHTML = countries.map(
      ({ flags, capital, population, languages, name }) =>
        `<div class="country-card"><img class="country-card__flag" src="${
          flags.svg
        }" alt="flag ${name.official}" width = "30" height ="18"> <h2> ${
          name.official
        }</h2></div>
          <li class="">Capital: ${capital} </li>
          <li class="">Population: ${population}  </li>
          <li class="">Languages: ${Object.values(languages)}  </li>
          `
    );
    // refs().countryInfoEl.innerHTML = markup2;
  }
}
