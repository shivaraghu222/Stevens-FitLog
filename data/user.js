// TODO: Export and implement the following functions in ES6 format
import {user} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
export const create = async (
  username,
  email,
  password,
  first_name,
  last_name
) => {
  //TODO: Input validation

  const user = {
    username,
    email,
    password,
    first_name,
    last_name
  };

  const userCollection = await user();
  await userCollection.insertOne(user);

  return user;

};

export const getAll = async () => {
  const userCollection = await user();
  const cursor = await userCollection.find();
  const usersArray = await cursor.toArray();
  return usersArray;
};

export const get = async (id) => {
  if (!id) 
    throw new Error("No id provided");
  
  if (typeof id !== "string" || id.trim().length === 0 || !ObjectId.isValid(id)) 
    throw new Er
  try {
    const objectId = new ObjectId(id);
    const userCollection = await user();
    const user = await userCollection.findOne({ _id: objectId });
    if (!user) 
      throw new Error(`No band found with id ${id}`);
    
    return user;
  } catch (error) {
    throw new Error(`Invalid id: ${id}`);
  }
};

// export const remove = async (id) => {
//   if (!id) 
//     throw new Error("No id provided");
  
//   if (typeof id !== "string" || id.trim().length === 0 || !ObjectId.isValid(id)) 
//     throw new Error("Invalid id");
  
//   const bandCollection = await user();
//   const band = await bandCollection.findOne({ _id: new ObjectId(id) });
//   const result = await bandCollection.deleteOne({ _id: new ObjectId(id) });

//   if (result.deletedCount === 0) 
//     throw new Error('Band not found');
  
//   return `${band.name} has been successfully deleted!`;
// };

// export const rename = async (id, newName) => {
//   if (!id) 
//     throw new Error("No id provided");
  
//   if (typeof id !== "string" || id.trim().length === 0 || !ObjectId.isValid(id)) 
//     throw new Error("Invalid id");
  
//   if (!newName) 
//     throw new Error("No new name provided");
  
//   if (typeof newName !== "string" || newName.trim().length === 0) 
//     throw new Error("Invalid new name");
  
//   const objectId = new ObjectId(id);
//   const bandCollection = await user();
//   const band = await bandCollection.findOne({ _id: objectId });
//   if (!band) 
//     throw new Error(`No band found with id ${id}`);
  
//   if (band.name === newName) 
//     throw new Error(`New name is the same as the current value stored in the database`);
  
//   try {
//     await bandCollection.findOneAndUpdate(
//       { _id: objectId },
//       { $set: { name: newName } },
//       { returnOriginal: false }
//     );
//     return await bandCollection.findOne({ _id: objectId });
//   } catch (error) {
//     throw new Error(`Could not update band with id ${id}`);
//   }
// };
