export default function refs() {
  const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info'),
  };
  return refs;
}
