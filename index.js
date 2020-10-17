const express = require('express');
const persons = require("./db.json");

const app = express();

app.use(express.json());

console.log(persons);
// const persons = JSON.parse(db);

app.get("/api/persons", (request, response) => {
  response.json(persons);
})

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));