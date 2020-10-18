const express = require('express');
const db = require("./db.json");

const app = express();

app.use(express.json());


let persons = db.persons.map(person => person);
console.log(persons);

const generateRandomId = () => Math.floor(Math.random() * 10000 + 1);

// ROUTES
app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/info', (req, res) => {
  const totalPersons = persons.length;
  console.log(totalPersons);
  // console.log(persons.length)
  const calcDate = new Date();
  
  res.send(
    `<p>Phonebook has info for ${totalPersons} people.</p>
    <p>${calcDate}</p>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if(person) {
    res.json(person)
  } else {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const newPersons = persons.filter(person => person.id !== id);
  persons = newPersons;
  console.log(persons);

  res.status(404).send('person deleted').end();
})

app.post('/api/persons', (req, res) => {
  const body = req.body;

  const nameCheck = persons.find(person => person.name === body.name);

  if (!body.name ) {
    return res.status(400).json({error: 'name missing'})
  }

  if (!body.number) {
    return res.status(400).json({error: 'number missing'})
  }

  if(nameCheck) {
    return res.status(400).json({ error: 'Name already exists'})
  }


  const person = {
    name: body.name,
    number: body.number,
    id: generateRandomId()
  }

  persons = persons.concat(person);
  console.log(persons);

  res.json(person);

})

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));