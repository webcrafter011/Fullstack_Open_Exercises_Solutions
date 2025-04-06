import { deletePerson } from "../services/notes";

const Persons = ({ filteredPersons, persons, setPersons }) => {
  const handleClick = (id) => {
    const person = persons.find(p => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (!confirmDelete) return;

    deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch((error) => {
        alert("Failed to delete the contact. Maybe it was already removed.");
        console.error(error);
      });
  };

  return (
    <>
      <h2>Contacts</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name}: {person.number}{" "}
            <button onClick={() => handleClick(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
