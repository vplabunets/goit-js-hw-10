import './css/styles.css';
import { debounce } from 'lodash';
let _ = require('lodash');
const DEBOUNCE_DELAY = 300;
const refs = {
  inputEl: document.querySelector('#search-box'),
  divCountryEl: document.querySelector('.country-info'),
};
let aaaa = refs.inputEl.addEventListener(
  'input',
  _.debounce(onInputType, DEBOUNCE_DELAY)
);

console.log(refs.inputEl);

function onInputType(event) {
  //   event.preventDefault();
  //   formData[e.target.name] = e.target.value;
  let inputData = event.target.value;
  inputData = inputData.trim();
  console.log(inputData);
  fetchCountries(inputData);
  return inputData;
}
// console.log(onInputType());

function fetchCountries(name) {
  let countryLink = `https://restcountries.com/v2/name/${name}`;
  const fetchedCountry = fetch(countryLink)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      console.log(countries);
      let names = countries.map(country => country.name);
      console.log(names);

      for (const nameOfCountry of names) {
        // if (names.length >= 5) {
        refs.divCountryEl.innerHTML = `<ul><li>${nameOfCountry}</li></ul>`;
        // } else {
        //   refs.divCountryEl.innerHTML = `<ul><li>${nameOfCountry}</li></ul>`;
        //   console.log('нужно сделать другую разметку');
        // }
      }
    })
    .catch(error => console.log(error));
  return fetchedCountry;
}

console.log(fetchCountries(onInputType()));
