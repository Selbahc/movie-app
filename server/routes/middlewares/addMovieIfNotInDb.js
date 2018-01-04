import Movie from '../../models/movie';

export default (req, res, next) => {
  Movie.findOne({ uid: req.params.id }, (err, movie) => {
    if (err) return res.json({ success: false, message: err });
    if (!movie) {
      const favorite = new Movie({ uid: req.params.id });
      favorite.save((err, favorite) => {
        if (err) return res.json({ success: false, message: 'Unable to find nor add movie' });
        req.favoriteId = favorite._id;
        next();
      });
    } else {
      req.favoriteId = movie._id;
      next();
    }
  });
}