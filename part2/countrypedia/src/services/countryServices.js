import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries";

export const findCountry = (input) => {
  return axios.get(`${baseUrl}/api/all`).then((response) => {
    const data = response.data;
    const matchingCountries = data.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(input.toLowerCase());
    });

    return matchingCountries;
  });
};

export const findMatch = (countries, input) => {
  const country = countries.find(
    (country) =>
      country.name.common.toLowerCase() === input.trim().toLowerCase()
  );

  return country;
};
