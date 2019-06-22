require('dotenv').config();
require('./config/db');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const schema = require('./schema');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/auth', authRoutes);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Succesfully connected and listening to the port ${PORT}`);
});
