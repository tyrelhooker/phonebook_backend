const express = require('express');
const db = require("./db.json");

const app = express();

app.use(express.json());


const persons = db.persons.map(person => person);
// const persons = JSON.parse(db);

app.get("/api/persons", (request, response) => {
  response.json(persons);
})

app.get("/info", (request, response) => {
  const totalPersons = persons.length;
  console.log(totalPersons);
  // console.log(persons.length)
  const calcDate = new Date();
  
  response.send(
    `<p>Phonebook has info for ${totalPersons} people.</p>
    <p>${calcDate}</p>`
  )
})

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));