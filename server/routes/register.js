const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const multer = require('multer');

const api = express.Router();

api.post('/register', 
  multer().array(),
  (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
        continent: req.body.continent,
      });
      newUser.save(err => 
        err
          ? res.json({ success: false, message: err })
          : res.json({ success: true, message: 'Your account have been successfully created !' })
      );
    })
    .catch(err => console.log(err));
});

module.exports = api;