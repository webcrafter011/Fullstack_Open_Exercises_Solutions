const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/mongo");

// initialize express server
const app = express();

// allow connection from all routes
app.use(cors());

// parse json objects
app.use(express.json());

// custom token to use morgan
morgan.token("body", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// base entry
app.get("/", (request, response) => {
  response.send("<h1>Welcome to Phonebook</h1>");
});

// see all entries
app.get("/api/persons", (request, response) => {
  Contact.find({}).then((res) => {
    response.json(res);
  });
});

// phonebook directory info
app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<h3>Phonebook has info for ${persons.length} people</h3>
        ${date}
        `
  );
});

// to see single entry
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.send(person);
  } else {
    response.status(404).send(`person with id ${id} not found`);
  }
});

// to delete an entry
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    response.send(person);
    response.status(204);
  } else {
    response.send("person not found");
  }
});

// to add an entry
app.post("/api/persons", (request, response) => {
  const body = request.body;

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing",
    });
  }

  // Check for duplicate name
  // const nameExists = persons.some((p) => p.name === body.name);
  // if (nameExists) {
  //   return response.status(400).json({
  //     error: "Name must be unique",
  //   });
  // }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((res) => response.json(res))
    .catch((e) => console.log("error occured: " + e));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Phonebook is running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});
