import { useState, useEffect } from "react";
import Country from "./Country";
import { findMatch } from "../services/countryServices";

const SearchBar = ({ handleChange, countries, input }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (input === "") {
      setSelectedCountry(null);
    }
  }, [input]);

  const handleShow = (countryName) => {
    const country = findMatch(countries, countryName);
    setSelectedCountry(country);
  };

  const showCountries = () => {
    if (countries.length > 10) {
      return "more than 10 results";
    }

    const country = findMatch(countries, input);
    if (country) {
      return <Country country={country} />;
    } else {
      const list = countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}{" "}
          <button onClick={() => handleShow(country.name.common)}>show</button>
        </li>
      ));
      return <ul>{list}</ul>;
    }
  };

  return (
    <>
      <div>
        Find country: <input type="text" onChange={handleChange} />
      </div>
      {/* Countries that are found */}
      {input && showCountries()}
      {/* Display selected country */}
      {input !== "" && selectedCountry && <Country country={selectedCountry} />}
    </>
  );
};

export default SearchBar;
