// External Dependencies
import express, { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service';
// import Restaurant from '../models/restaurant';

// Global Config
export const restaurantsRouter = express.Router();

restaurantsRouter.use(express.json());

// GET
restaurantsRouter.get('/restaurants', async (_req: Request, res: Response) => {
  try {
    const restaurants = await collections.restaurants.find({}).toArray();
    res.status(200).send(restaurants);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// POST

// PUT

// DELETE
