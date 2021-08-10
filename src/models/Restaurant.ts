import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import { Collections } from "../enum";

export interface IRestaurant {
  readonly _id: string;
  readonly name: string;
  readonly city: string;
}

export class Restaurant {
  readonly _id: string;
  readonly name!: string;
  readonly city!: string;

  constructor({ _id, name, city }: Partial<IRestaurant>) {
    if (!_id) this._id = uuid(); else this._id = _id;
    if(name) this.name = name
    if(city) this.city = city
  }

  public toObject(): IRestaurant {
    return {...this};
  }
}

const RestaurantSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: Date, required: true },
}, {
  timestamps: true
});

export const RestaurantModel = mongoose.models.RestaurantModel || mongoose.model('RestaurantModel', RestaurantSchema, Collections.restaurants);
