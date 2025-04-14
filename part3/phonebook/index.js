const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

// custom token to use morgan
morgan.token("body", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// base entry
app.get("/", (request, response) => {
  response.send("<h1>Welcome to Phonebook</h1>");
});

// see all entries
app.get("/api/persons", (request, response) => {
  response.send(persons);
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
  const nameExists = persons.some((p) => p.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  // Generate new id
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;

  const newPerson = {
    id: String(maxId + 1), // Keep ID consistent as string
    name: body.name,
    number: body.number,
  };

  persons = [...persons, newPerson];

  response.status(201).json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Phonebook is running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});
