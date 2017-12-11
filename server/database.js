const mongoose = require('mongoose');

module.exports = (url) => mongoose.connect(url, () => console.log('connected to db'));