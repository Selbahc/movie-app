import bcrypt from 'bcrypt';
import express from 'express';
import User from '../../models/user';
import multer from 'multer';

export const register = express.Router().post('/register', multer().array(), (req, res) => {
 
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