// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Model, Mongoose } from 'mongoose';
import { Application } from '@/declarations';
import { UserInterface } from '@/shared/types/users';

export default function (app: Application): Model<UserInterface> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model<UserInterface>(modelName, schema);
}
