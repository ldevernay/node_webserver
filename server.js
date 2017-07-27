const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Set port to env variable for Heroku, 3000 for dev
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req,res,next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: `Sorry, we are closed!`,
//     endDate: '31/08/2017'
//   });
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
  if(err) {
    console.log('Unable to append to server.log.');
  }
});
  next();
})

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Greetings from Express!'
  });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'My lovely projects!',
    projects: 'Hello World, TodoList.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unknown page'
  });
});

app.listen(port, () => {
  console.log(`Server up and listening to ${port}`);
});
