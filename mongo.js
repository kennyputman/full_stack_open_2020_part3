const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Pass arguments in as: [password] ['first_name last_name'] [number]"
  );
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true });

const Person = mongoose.model("Person", {
  name: String,
  number: String,
  date: Date,
});

const person = new Person({
  name: personName,
  number: personNumber,
  date: new Date(),
});

if (false) {
  person.save().then((response) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    console.log("---------------");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
