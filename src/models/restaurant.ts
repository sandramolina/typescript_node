// External dependencies
import { ObjectId } from 'mongodb';

// Class Implementation
export default class Restaurant {
  constructor(
    public address: {
      building: string;
      coord: [number, number];
      street: string;
      zipcode: string;
    },
    public borough: string,
    public cuisine: string,
    public grades: {
      date: Date;
      grade: string;
      score: number;
    }[],
    public name: string,
    public restaurant_id: string,
    public id?: ObjectId
  ) {}
}
