const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
// const jwt  = require('jsonwebtoken');
const db = require('./config/database')

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const contactRoute = require('./api/routes/contact');
const userRoute  = require('./api/routes/user')
app.use('/api', contactRoute)
app.use('/api', userRoute)

app.get('/', (req, res) => {
  res.send('Welcomet to ExpressJS API!')
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Express app listening at http://localhost:${PORT}`)
});
