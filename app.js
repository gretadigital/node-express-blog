require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// Express App:
const app = express();

// Connect to MongoDB:
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // Listen for requests:
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Register View Engine:
app.set('view engine', 'ejs');

// Custom Middleware:
// app.use((req, res, next) => {
//   console.log('New request made:');
//   console.log('Host: ', req.hostname);
//   console.log('Path: ', req.path);
//   console.log('Method: ', req.method);
//   next();
// });

// Middleware and Static Files:
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Third-Party Middleware:
app.use(morgan('dev'));

// ! Basic Routes:

// Home Page:
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// About Page:
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// ! Blog Routes:
app.use('/blogs', blogRoutes);

// 404 Page:
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
