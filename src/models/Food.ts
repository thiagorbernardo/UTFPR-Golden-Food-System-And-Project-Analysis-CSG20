import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import { Collections } from "../enum";

export interface IFood {
  readonly _id: string;
  readonly name: string;
  readonly ingredients: string[];
  readonly price: number;
}

export class Food implements IFood {
  readonly _id!: string;
  readonly name!: string;
  readonly ingredients!: string[];
  readonly price!: number;

  constructor({ name, ingredients, price, _id }: Partial<IFood>) {
    if (!_id) this._id = uuid(); else this._id = _id;
    if(name) this.name = name;
    if(ingredients) this.ingredients = ingredients;
    if(price) this.price = price;
  }

  public toObject(): IFood {
    return {...this};
  }
}

const FoodSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true
});

export const FoodModel = mongoose.models.FoodModel || mongoose.model('FoodModel', FoodSchema, Collections.foods);
