// TODO: Export and implement the following functions in ES6 format
import {fitnessProgresses} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
export const create = async (
  user_id,
  measurement_id,
  workout_records,
  meal_plan_id,
) => {
  //TODO: Input validation

  const fitnessProgress = {
    user_id,
    measurement_id,
    workout_records,
    meal_plan_id,
  };

  const fitnessProgressCollection = await fitnessProgresses();
  await fitnessProgressCollection.insertOne(fitnessProgress);

  return fitnessProgress;

};

export const getAll = async () => {
  const fitnessProgressCollection = await fitnessProgresses();
  const cursor = await fitnessProgressCollection.find();
  const fitnessProgressesArray = await cursor.toArray();
  return fitnessProgressesArray;
};

export const get = async (id) => {
  if (!id) 
    throw new Error("No id provided");
  
  if (typeof id !== "string" || id.trim().length === 0 || !ObjectId.isValid(id)) 
    throw new Error;
  try {
    const objectId = new ObjectId(id);
    const fitnessProgressCollection = await fitnessProgresses();
    const fitnessProgress = await fitnessProgressCollection.findOne({ _id: objectId });
    if (!fitnessProgress) 
      throw new Error(`No fitnessProgress found with id ${id}`);
    
    return fitnessProgress;
  } catch (error) {
    throw new Error(`Invalid id: ${id}`);
  }
};
