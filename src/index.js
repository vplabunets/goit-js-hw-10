import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountriesByName from './fetchCountries';
import refs from './refs';
import { debounce } from 'lodash';
let _ = require('lodash');
const DEBOUNCE_DELAY = 300;
const FAILURE_MESSAGE = 'Oops, there is no country with that name';
const NOTIFICATION_MESSAGE =
  'Too many matches found. Please enter a more specific name.';
let aaaa = refs().inputEl.addEventListener(
  'input',
  _.debounce(onInputType, DEBOUNCE_DELAY)
);

function onInputType(event) {
  event.preventDefault();
  let inputData = event.target.value;
  // console.log(event.target.value);
  inputData = inputData.trim();
  console.log(inputData);
  fetchCountriesByName(inputData)
    .then(renderCountry)
    .catch(error => console.log(error));
  // return inputData;
}

function renderCountry(countries) {
  // if (!countries.status) {
  if (countries.length >= 10) {
    // let names = countries.map(country => country.name);
    // console.log(names);
    return Notiflix.Notify.info(NOTIFICATION_MESSAGE);
  } else if (countries.length >= 2 && countries.length <= 10) {
    console.log(countries);
    const markup = countries
      .map(
        ({ flags, capital, population, languages, name }) =>
          `<li class="country-item"><img class="country-flag" src="${flags.svg}"
           alt="flag ${name.official}" width = "30" height ="18"> 
           <p class="country-name">${name.official}</p></li>`
      )
      .join('');
    // console.log(markup);
    // for (const nameOfCountry of names) {
    // console.log(nameOfCountry);>
    refs().countryListEl.innerHTML = markup;
  } else {
    refs().countryListEl.remove();
    console.log('тут будет красота');
    const markup2 = countries
      .map(function ({ flags, capital, population, languages, name }) {
        console.log(languages);
        let markup = `<div class="country-card"><img class="country-card__flag" src="${
          flags.svg
        }"
          alt="flag ${name.official}" width = "30" height ="18"> <h2> ${
          name.official
        }</h2></div>
          <li class="">Capital: ${capital} </li>
          <li class="">Population: ${population}  </li>
          <li class="">Languages: ${Object.values(languages)}  </li>
          `;
        return markup;
      })
      .join('');
    refs().countryInfoEl.innerHTML = markup2;
  }
}
