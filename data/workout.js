import {routines} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
export const create = async (
  user_id,
  routine_name,
  exercises
) => {
  //TODO: Input validation
  const workout = {
    user_id,
    routine_name,
    exercises
  };

  const workoutCollection = await routines();
  await workoutCollection.insertOne(workout);
  return workout;

};

export const getAll = async () => {
  const workoutCollection = await routines();
  const cursor = await workoutCollection.find();
  const workoutArray = await cursor.toArray();
  return workoutArray;
};

export const get = async (id) => {
  if (!id) 
    throw new Error("No id provided");
  
  if (typeof id !== "string" || id.trim().length === 0 || !ObjectId.isValid(id)) 
    throw new Error;
  try {
    const objectId = new ObjectId(id);
    const workoutCollection = await routines();
    const workout = await workoutCollection.findOne({ _id: objectId });
    if (!workout) 
      throw new Error(`No workout found with id ${id}`);
    
    return workout;
  } catch (error) {
    throw new Error(`Invalid id: ${id}`);
  }
};

export const getWeights = async (user_id) => {
  const workoutCollection = await routines();
  const userRoutines = await workoutCollection.find({ user_id }).toArray();

  const exerciseWeightsMap = {};

  for (const userRoutine of userRoutines) {
    for (let i = 0; i < userRoutine.exercises.length; i++) {
      const exerciseName = userRoutine.exercises[i].exercise_name;
      const exerciseSets = userRoutine.exercises[i].sets;
      if (!(exerciseName in exerciseWeightsMap)) {
        exerciseWeightsMap[exerciseName] = [];
      }

      for (const set of exerciseSets) {
        exerciseWeightsMap[exerciseName].push(set.weight);
      }
    }
  }

  return exerciseWeightsMap;
}
