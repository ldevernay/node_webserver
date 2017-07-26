const express = require('express');

let app = express();

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: "Bob",
    age: 34
  });
});

app.get('/about', (req, res) => {
  res.send('<h1>About page</h1>');
});

app.listen(3000);
