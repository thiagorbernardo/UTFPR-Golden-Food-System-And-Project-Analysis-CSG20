import mongoose, { Schema, Model } from 'mongoose';
import env from '../config/Environment';

const connection = {
  isConnected: 0
} /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/

  if (connection.isConnected) {
    return
  }

  /* connecting to our database */
  const db = await mongoose.connect(env.mongo.uri!, { dbName: env.mongo.dbName, useNewUrlParser: true, useUnifiedTopology: true })


  connection.isConnected = db.connections[0].readyState
}

export default dbConnect

