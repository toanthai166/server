const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
CommentSchema.plugin(toJSON);
// CommentSchema.plugin(paginate);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
