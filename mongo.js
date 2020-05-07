const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log(
    "Pass arguments in as: [password] ['first_name last_name'] [number]"
  );
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
personSchema.plugin(uniqueValidator);

const Person = mongoose.model("Person", personSchema);

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
