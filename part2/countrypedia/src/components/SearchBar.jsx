const SearchBar = ({ handleChange, countries, input }) => {
  const showCountries = () => {
    if (countries.length > 10) {
      return "more than 10 results";
    }

    const country = countries.find(
      (country) =>
        country.name.common.toLowerCase() === input.trim().toLowerCase()
    );

    if (country) {
      let languages = [];

      for (let key in country.languages) {
        languages.push(<li key={key}>{country.languages[key]}</li>);
      }

      return (
        <>
          <div>
            <h1>{country.name.common}</h1>
            <div>capital: {country.capital[0]}</div>
            <h1>Languages</h1>
            <ul>{languages}</ul>
            <img src={country.flags["png"]} alt={country.flags["alt"]} />
          </div>
        </>
      );
    } else {
      const list = countries.map((country) => (
        <li key={country.cca3}>{country.name.common}</li>
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
    </>
  );
};

export default SearchBar;
