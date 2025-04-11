const Country = ({ country }) => {
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
};

export default Country;
