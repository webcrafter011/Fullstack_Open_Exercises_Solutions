const mongoose = require("mongoose");

// Better CLI usage hint
if (process.argv.length < 3) {
  console.log("Usage:");
  console.log("To list all contacts: node index.js <password>");
  console.log("To add a contact:     node index.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// Use phone number as a string to preserve leading zeroes, +91, etc.
const url = `mongodb+srv://manujchaudhari123:${password}@craftmyplate.powky.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=craftMyPlate`;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    if (process.argv.length === 3) {
      // List all contacts
      Contact.find({})
        .then((contacts) => {
          console.log("Phonebook:");
          contacts.forEach((contact) => {
            console.log(`${contact.name}: ${contact.number}`);
          });
          mongoose.connection.close();
        })
        .catch((err) => {
          console.error("Error retrieving contacts:", err);
          mongoose.connection.close();
        });
    } else if (name && number) {
      // Add a new contact
      const contact = new Contact({ name, number });

      contact
        .save()
        .then((res) => {
          console.log(`Contact saved: ${res.name} (${res.number})`);
          mongoose.connection.close();
        })
        .catch((err) => {
          console.error("Error saving contact:", err);
          mongoose.connection.close();
        });
    } else {
      console.log("Error: Both name and number must be provided.");
      mongoose.connection.close();
    }
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// Define schema and model after DB connection logic
const contactSchema = new mongoose.Schema({
  name: String,
  number: String, // Changed to String for better flexibility
});

const Contact = mongoose.model("Contact", contactSchema);