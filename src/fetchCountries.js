export default function fetchCountriesByName(name) {
  let countryLink = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(countryLink).then(countryObject => {
    return countryObject.json();
  });
}
