import './css/styles.css';
import { debounce } from 'lodash';
let _ = require('lodash');
const DEBOUNCE_DELAY = 300;
const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};
let aaaa = refs.inputEl.addEventListener(
  'input',
  _.debounce(onInputType, DEBOUNCE_DELAY)
);

// console.log(refs.inputEl);

function onInputType(event) {
  //   event.preventDefault();

  let inputData = event.target.value;
  // console.log(event.target.value);
  inputData = inputData.trim();
  // console.log(inputData);
  fetchCountries(inputData);
  return inputData;
}
// console.log(onInputType());

function fetchCountries(name) {
  // let countryLink = `https://restcountries.com/v2/name/${name},{name}`;
  let countryLink = `https://restcountries.com/v2/{${name}}?fields={name.official},{capital},{population},{flags.svg},{languages}`;
  // let countryLink = 'https://restcountries.com/v2/all?fields=name,capital,currencies'
  // let countryLink = `https://restcountries.com/v2/all?fields=${name},capital,currencies`;
  const fetchedCountry = fetch(countryLink)
    .then(response => {
      return response.json();
    })
    .then(renderCountry)
    .catch(error => console.log(error));
  return fetchedCountry;
}

console.log(fetchCountries(onInputType()));

function renderCountry(countries) {
  // console.log(countries);
  // let names = countries.map(country => country.name);
  // console.log(names);
  if (countries.length >= 10) {
    return alert('сильно много хочешь');
  } else if (countries.length >= 2 && countries.length <= 10) {
    const markup = countries
      .map(
        nameOfCountry =>
          `<li class="country-item"><img class="country-flag" src="${nameOfCountry.flags.svg}"
           alt="flag ${nameOfCountry.name}" width = "30" height ="18"> 
           <p class="country-name">${nameOfCountry.name}</p></li>`
      )
      .join('');
    // console.log(markup);
    // for (const nameOfCountry of names) {
    // console.log(nameOfCountry);>
    refs.countryListEl.innerHTML = markup;
  } else {
    refs.countryListEl.remove();
    console.log('тут будет красота');

    const markup2 = countries
      .map(
        nameOfCountry =>
          `<div class="country-card"><img class="country-card__flag" src="${nameOfCountry.flags.svg}"
           alt="flag ${nameOfCountry.name}" width = "30" height ="18"> <h2> ${nameOfCountry.name}</h2></div>
          <li class="">Capital: ${nameOfCountry.capital} </li>
          <li class="">Population: ${nameOfCountry.population}  </li>
          <li class="">Languages: ${nameOfCountry.languages[0].name}  </li>
          `
      )
      .join('');
    refs.countryInfoEl.innerHTML = markup2;
  }

  // refs.countryInfoEl.innerHTML = markup2;
  // refs.divCountryEl.innerHTML = `<ul><li>${nameOfCountry}</li></ul>`;
  // console.log('нужно сделать другую разметку');
  // }
  // }
}
