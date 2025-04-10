const Persons = ({ persons, handleDelete }) => { // Receive persons and handleDelete

  return (
    <>
      {/* Removed h2 Contacts as requested by structure in App.jsx */}
      <ul>
        {persons.map((person) => ( // Use the received 'persons' prop
          <li key={person.id}>
            {person.name}: {person.number}{" "}
            <button onClick={() => handleDelete(person.id)}>Delete</button> {/* Use handleDelete */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;