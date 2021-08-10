import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import { Collections } from "../enum";

export interface IMenu {
  readonly _id: string;
  readonly restaurantId: string;
  readonly dessert: string[];
  readonly drinks: string[];
  readonly mainCourse: string[];
  readonly general: string[];
  readonly unavailableFoods: string[];
}

export class Menu {
  readonly _id: string;
  readonly restaurantId!: string;
  readonly dessert!: string[];
  readonly drinks!: string[];
  readonly mainCourse!: string[];
  readonly general!: string[];
  readonly unavailableFoods!: string[];

  constructor({ _id, restaurantId, dessert, drinks, mainCourse, general, unavailableFoods, }: Partial<IMenu>) {
    if (!_id) this._id = uuid(); else this._id = _id;
    if(restaurantId) this.restaurantId = restaurantId
    if(dessert) this.dessert = dessert
    if(drinks) this.drinks = drinks
    if(mainCourse) this.mainCourse = mainCourse
    if(general) this.general = general
    if(unavailableFoods) this.unavailableFoods = unavailableFoods
  }

  public toObject(): IMenu {
    return {...this};
  }
}

const MenuSchema: Schema = new Schema({
  _id: { type: String, required: true },
  restaurantId: { type: String, required: true },
  ingredients: { type: [String], required: true },
  dessert: { type: [String], required: true },
  drinks: { type: [String], required: true },
  mainCourse: { type: [String], required: true },
  general: { type: [String], required: true },
  unavailableFoods: { type: [String], required: true },
}, {
  timestamps: true
});

export const MenuModel = mongoose.models.MenuModel || mongoose.model('MenuModel', MenuSchema, Collections.menu);
