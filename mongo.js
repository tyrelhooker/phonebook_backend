const mongoose = require('mongoose');

let procArgLen = process.argv.length;


const setURL = (password) => {
  // mongodb+srv://liveforsomething:<password>@cluster0.o6s45.mongodb.net/<dbname>?retryWrites=true&w=majority
  const url = `mongodb+srv://liveforsomething:${password}@cluster0.o6s45.mongodb.net/persons?retryWrites=true&w=majority`;
  return url;
}

const password = process.argv[2];

const url = setURL(password);

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema);

if (procArgLen < 3) {
  console.log('Please provide a password as an argument, example: node <fileName>.js <password>');
  process.exit(1); 
} else if (procArgLen === 3) {
  console.log('prints all names');

  Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(person);
      })
      mongoose.connection.close();
    })
  
} else if (procArgLen === 4) {
  console.log('Need to add name and phonenumber');
} else {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save()
    .then(result => {
      console.log('Person saved');
      mongoose.connection.close();
    })
  
}
    