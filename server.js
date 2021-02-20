const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
// db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
