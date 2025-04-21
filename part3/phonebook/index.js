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
  Contact.find({}).then((persons) => {
    const date = new Date();
    response.send(
      `<h3>Phonebook has info for ${persons.length} people</h3>
          ${date}
          `
    );
  });
});

// to see single entry
app.get("/api/persons/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch((e) => next(e));
});

// to delete an entry
app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((e) => next(e));
});

// to add an entry
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing",
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((res) => response.json(res))
    .catch((e) => next(e));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { number } = request.body;

  Contact.findById(request.params.id).then((contact) => {
    if (!contact) {
      return response.status(404).end();
    }

    contact.number = number;

    contact
      .save()
      .then((updatedContact) => response.json(updatedContact))
      .catch((e) => next(e));
  });
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Phonebook is running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});
