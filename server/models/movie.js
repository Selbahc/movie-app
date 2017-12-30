import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  favoritesCount: { type: Number, min: 0 },
  watchListCount: { type: Number, min: 0 },
  seenCount: { type: Number, min: 0 },
  usersFavorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  usersWatchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  usersSeen: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Movie', MovieSchema);