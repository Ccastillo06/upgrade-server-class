require('dotenv').config();
require('./config/db');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const schema = require('./schema');

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/auth', authRoutes);
app.use(
  '/graphql',
  passport.authenticate('jwt', { session: false }),
  graphqlHTTP(req => {
    return {
      schema,
      graphiql: true,
      context: {
        user: req.user
      }
    };
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Succesfully connected and listening to the port ${PORT}`);
});
