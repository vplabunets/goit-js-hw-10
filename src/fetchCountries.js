export default function fetchCountriesByName(name) {
  // let countryLink = `https://restcountries.com/v2/name/${name},{name}`;
  // let countryLink = `https://restcountries.com/v2/{${name}}?fields={name.official},{capital},{population},{flags.svg},{languages}`;
  let countryLink = `https://restcountries.com/v3.1/name/${name}`;
  return (fetchedCountry = fetch(countryLink).then(response => {
    return response.json();
  }));

  // .then(renderCountry)
  // .catch(error => console.log(error)));
  // return fetchedCountry;
}
