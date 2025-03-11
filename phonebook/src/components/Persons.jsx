const Persons = ({ filteredPersons }) => {
  return (
    <>
      <h2>Contacts</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
