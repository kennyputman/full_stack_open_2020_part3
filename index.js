const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Test Person",
    number: "39-23-6483222",
    id: 5,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  const length = persons.length;
  const time = new Date();

  response.send(
    `<div>Phonebook has info for ${length} people<br><br>${time}</div>`
  );
});

const generateID = () => {
  const maxID = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxID + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "Name and/or number are missing" });
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateID(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
