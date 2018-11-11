import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const userSchema = new Schema({
  passwordHash: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  phoneNumber: {type: Number, required: false, unique: true},
  username: { type: String, required: true, unique: true },
  tokenSeed: { type: String, required: true, unique: true },
  created: { type: Date, default : () => new Date()},
});

// export our module to use in server.js
export default mongoose.model('User', userSchema);