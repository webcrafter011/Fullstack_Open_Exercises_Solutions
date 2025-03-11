import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "123-456-7890",
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    let toAdd = true;
    persons.forEach((person) => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        toAdd = false;
      }
    });

    if (toAdd) {
      const newArr = [...persons, newPerson];
      setPersons(newArr);
      console.log(newArr);
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
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
      <div>
        <ul>
          {persons.map((person) => {
            return <li key={person.number}>{person.number}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
