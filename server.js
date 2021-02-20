const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// Add middlewares for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to somoye application.' });
});

require('./routes/tutorial.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
