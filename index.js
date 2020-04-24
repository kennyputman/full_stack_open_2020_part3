require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  const length = Person.length;
  const time = new Date();

  response.send(
    `<div>Phonebook has info for ${length} people<br><br>${time}</div>`
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()));
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person.toJSON());
  });
});

// const generateID = () => {
//   const randomID = Math.floor(Math.random() * 1000000);
//   return randomID;
// };

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.content === undefined) {
    return response.status(400).json({ error: "Content Missing" });
  }

  // const names = persons.map((person) => person.name);
  // const doesDuplicateExist = names.some((name) => name == body.name);
  // if (doesDuplicateExist) {
  //   return response.status(400).json({ error: "name must be unique" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson.toJSON());
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
