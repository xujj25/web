var mongoose = require('../dao/connect_db');

var Schema = mongoose.Schema;

var weiboSchema = new Schema(
  {
    topic: String,
    id: String,
    user: {
      id: String,
      screen_name: String,
      followers_count: Number
    },
    text: String,
    attitudes_count: Number,
    reposts_count: Number,
    comments_count: Number,
    source: String,
    created_at: Date
  }
);

module.exports = mongoose.model('Weibo', weiboSchema);