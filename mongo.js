const mongoose = require("mongoose");

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log(
    "Pass arguments in as: [password] ['first_name last_name'] [number]"
  );
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = `mongodb+srv://kenny:${password}@cluster0-led48.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model("Person", noteSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: personName,
    number: personNumber,
    date: new Date(),
  });

  person.save().then((response) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    console.log("---------------");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
