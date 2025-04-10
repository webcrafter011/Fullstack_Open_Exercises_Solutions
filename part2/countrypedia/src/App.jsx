import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { findCountry } from "./services/countryServices";

const App = () => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Fetch countries based on input
    findCountry(value).then((res) => {
      setCountries(res);
    });
  };

  return (
    <>
      <SearchBar handleChange={handleChange} countries={countries} input={input} />
    </>
  );
};

export default App;
