// External Dependencies
import express, { Request, Response, query } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service';

// Global Config
export const restaurantsRouter = express.Router();

restaurantsRouter.use(express.json());

// GET only the first 20 restaurants
// When making a request giving a page number: http://localhost:8080/restaurants/?page=4
//TODO: How to use number on the page constant?
restaurantsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const page: any = req.query.page || 0;
    const restosPerPage: number = 20;
    const toSkip: number = page * restosPerPage;
    const restaurants = await collections.restaurants
      .find({})
      .skip(toSkip)
      .limit(restosPerPage)
      .toArray();
    res.status(200).send(restaurants);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET all restaurants. Example: http://localhost:8080/restaurants
restaurantsRouter.get('/all', async (_req: Request, res: Response) => {
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
      //404 Not Found
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
      ? // 201 Created
        res.status(201).send(`Suscesfully added ${result.insertedId}`)
      : // 500 Internal Server Error
        res.status(500).send(`Failed to create a new resto`);
  } catch (error) {
    console.error(error);
    // 400 Bad Request
    res.status(400).send(error.message);
  }
});

// PUT -> This will only modify the fields that we change
restaurantsRouter.put('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedResto = req.body;
    const query = { _id: new ObjectId(id) };
    // $set adds or updates all fields
    const result = await collections.restaurants.updateOne(query, {
      $set: updatedResto,
    });

    result
      ? // 200 OK The resource has been fetched and is transmitted in the message body.
        res.status(200).send(`Suscessfully updated resto id ${id}`)
      : // 304 Not Modified
        res.status(304).send(`Resto with id ${id} not updated`);
  } catch (error) {
    console.error(error);
    // 400 Bad Request
    res.status(400).send(error.message);
  }
});

// DELETE
restaurantsRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.restaurants.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(200).send(`Suscesfully removed resto with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove game with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Resto with id ${id} not found`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
