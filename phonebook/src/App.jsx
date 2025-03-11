import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    };

    const newArr = [...persons, newPerson];
    setPersons(newArr);
    setNewName("");
    console.log(newArr);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <ul>
          {persons.map((person) => {
            return <li key={person.name}>{person.name}</li>;
          })}
        </ul>
      </div>
      <h2>Numbers</h2>
    </div>
  );
};

export default App;
