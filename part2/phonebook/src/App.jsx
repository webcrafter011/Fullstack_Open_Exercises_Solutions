import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/FIlter"; // Corrected import typo
import { getAll, addPerson, updateNumber, deletePerson } from "./services/notes"; // Added deletePerson import
import Message from "./components/Message";

const App = () => {
  // Application State
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ message: null, type: null }); // State for notification

  useEffect(() => {
    getAll().then((initialPersons) => { // Renamed variable to avoid conflict
      setPersons(initialPersons);
    });
  }, []);

  // Function to show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000); // Notification disappears after 5 seconds
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      // Person exists, ask to update
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const changedPerson = { ...existingPerson, number: newNumber };
        updateNumber(changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            showNotification(`Updated number for ${returnedPerson.name}`);
            setNewName(""); // Reset form
            setNewNumber(""); // Reset form
          })
          .catch(error => {
             console.error("Failed to update number:", error);
             // Optional: Show an error notification
             showNotification(`Failed to update ${newName}`, 'error');
          });
      }
    } else {
      // Person does not exist, add new person
      const newPersonObject = {
        name: newName,
        number: newNumber,
        // id will be added by the server usually
      };
      addPerson(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showNotification(`Added ${returnedPerson.name}`);
          setNewName(""); // Reset form
          setNewNumber(""); // Reset form
        })
         .catch(error => {
             console.error("Failed to add person:", error);
             // Optional: Show an error notification
             showNotification(`Failed to add ${newName}`, 'error');
          });
    }
  };

 const handleDelete = (id) => {
    const personToDelete = persons.find(p => p.id === id);
    if (!personToDelete) return;

    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);
    if (confirmDelete) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          showNotification(`Deleted ${personToDelete.name}`); // Notification for deletion
        })
        .catch((error) => {
          console.error("Failed to delete the contact:", error);
          showNotification(`Failed to delete ${personToDelete.name}. Maybe it was already removed.`, 'error');
          // If the person was already removed, update the state to reflect that
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };


  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  // Function to filter persons based on search
  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()) // Using includes for broader filtering
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Message message={notification.message} type={notification.type} /> {/* Pass notification state */}

      <Filter value={filter} setFilter={handleFilterChange} /> {/* Pass onChange directly */}

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons} // Pass filtered persons
        handleDelete={handleDelete} // Pass delete handler
      />
    </div>
  );
};

export default App;