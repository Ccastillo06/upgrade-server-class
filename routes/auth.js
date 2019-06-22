const express = require('express');
const router = express.Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');
const secret = process.env.SECRET;

const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      let error = 'Email Address Exists in Database.';
      return res.status(400).json(error);
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {});

module.exports = router;
