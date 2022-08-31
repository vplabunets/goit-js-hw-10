export default function fetchCountriesByName(name) {
  // let countryLink = `https://restcountries.com/v2/name/${name},{name}`;
  // let countryLink = `https://restcountries.com/v3.1/${name}?fields={name.official},{capital},{population},{flags.svg},{languages}`;
  const countryLink = `https://restcountries.com/v3.1/name/${name}`;
  return fetch(countryLink).then(countryObject => {
    // console.log(countryObject.json());
    // if (countryObject.status === 404) {
    //   console.log(countryObject.status);
    //   return;
    // }

    return countryObject.json();
  });
}
