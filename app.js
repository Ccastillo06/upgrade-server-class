require('dotenv').config();
require('./config/db');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const schema = require('./schema');

const app = express();
app.use(cors());
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
