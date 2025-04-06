import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/FIlter";
import { getAll, addPerson, updateNumber } from "./services/notes";

const App = () => {
  // Application State
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

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
      addPerson(newPerson).then((response) => {
        setPersons([...persons, response]);
      });
    } else {
      const update = window.confirm(
        `${newName} is already added to phonebook would you like to update number?`
      );
      if (!update) return;

      const person = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
      const changedPerson = { ...person, number: newNumber };

      updateNumber(changedPerson).then((response) => {
        setPersons(
          persons.map((person) =>
            person.name.toLowerCase() === newName.toLowerCase()
              ? response
              : person
          )
        );
      });
    }
    
    // reseting form after adding new entry 
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  // Function to filter persons based on search
  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} setFilter={setFilter} />

      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <Persons
        persons={persons}
        setPersons={setPersons}
        filteredPersons={filteredPersons}
      />
    </div>
  );
};

export default App;
