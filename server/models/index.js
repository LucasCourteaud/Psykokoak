import mongoose from 'mongoose'
import Users from './user.models.js';

const db = {};

mongoose.Promise = global.Promise;
db.mongoose = mongoose;
db.Users = Users;

export default db;