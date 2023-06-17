// External Dependencies
import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service';

// Global Config
export const restaurantsRouter = express.Router();

restaurantsRouter.use(express.json());

// GET all restaurants. Example: http://localhost:8080/restaurants
restaurantsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const restaurants = await collections.restaurants.find({}).toArray();
    res.status(200).send(restaurants);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET restaurants by ID Example: http://localhost:8080/restaurants/5eb3d668b31de5d588f4292e
restaurantsRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const restaurant = await collections.restaurants.findOne(query);

    if (restaurant) {
      res.status(200).send(restaurant);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
restaurantsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newRestaurant = req.body;
    const result = await collections.restaurants.insertOne(newRestaurant);

    result
      ? res.status(201).send(`Suscesfully added ${result.insertedId}`)
      : res.status(500).send(`Failed to create a new resto`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// PUT

// DELETE
