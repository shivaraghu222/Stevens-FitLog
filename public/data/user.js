// TODO: Export and implement the following functions in ES6 format
import {users} from '../config/mongoCollections.js';
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

  const userCollection = await users();
  await userCollection.insertOne(user);

  return user;

};

export const getAll = async () => {
  const userCollection = await users();
  const cursor = await userCollection.find();
  const usersArray = await cursor.toArray();
  return usersArray;
};

export const get = async (id) => {
  if (!id) 
    throw new Error("No id provided");
  
  if (typeof id !== "string" || id.trim().length === 0 || !ObjectId.isValid(id)) 
    throw new Error
  try {
    const objectId = new ObjectId(id);
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: objectId });
    if (!user) 
      throw new Error(`No band found with id ${id}`);
    
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(`Invalid id: ${id}`);
  }
};

