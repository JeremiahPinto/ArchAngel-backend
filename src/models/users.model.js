// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new mongooseClient.Schema({
    name: {
      first: {
        type: String,
      },
      last: {
        type: String,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user'],
      required: true,
    },
    occupation: {
      type: String,
      default: 'client',
      enum: ['client', 'consultant', 'contractor', 'staff'],
      required: true,
    },
    projects: [{
      type: Schema.Types.ObjectId,
      ref: 'projects',
    }],
    company: {
      type: String,
      default: 'Actus Associates',
      enum: ['Actus Associates'],
      required: true,
    },
    // Tokens for user auth
    isVerified: {
      type: Boolean,
    },
    verifyToken: {
      type: String,
    },
    verifyExpires: {
      type: Date,
    },
    verifyChanges: {
      type: Object,
    },
    resetToken: {
      type: String,
    },
    resetExpires: {
      type: Date,
    },
  }, {
    timestamps: true,
  });

  return mongooseClient.model('users', users);
};
