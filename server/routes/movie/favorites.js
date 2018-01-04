import express from 'express';

import checkAuthentication from '../middlewares/checkAuthentication';
import addMovieIfNotInDb from '../middlewares/addMovieIfNotInDb';

import User from '../../models/user';
import Movie from '../../models/movie';

const router = express.Router();


router.get('/favorites', checkAuthentication, (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err) return res.json({ success: false, message: 'User not found', err });
    res.json({ success: true, favorites: user.favorites });
  });
});

router.post('/favorites/add/:id', checkAuthentication, addMovieIfNotInDb, (req, res) => {
  User.findByIdAndUpdate(req.userId, { $addToSet: {"favorites": req.favoriteId} }, (err, user) => {
    if (err) return res.json({ success: false, message: 'User not found', err });
    Movie.findByIdAndUpdate(req.favoriteId, { $inc: {"favoritesCount": 1} }, (err, movie) => {
      if (err) return res.json({ success: false, message: 'Movie not found', err });      
      res.json({ success: true, message: 'Movie added to your favorites' });
    });
  });
});

export default router;