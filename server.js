const express = require('express');

let app = express();

app.use(express.static(__dirname + '/public'));

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

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unknown page'
  });
});

app.listen(3000);
