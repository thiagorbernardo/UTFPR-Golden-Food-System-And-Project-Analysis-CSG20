import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import { Collections } from "../enum";

export interface IEmployee {
  readonly _id: string;
  readonly restaurantId: string;
  readonly name: string;
  readonly score: number;
  readonly workHours: number;
}

export class Employee {
  readonly _id!: string;
  readonly restaurantId!: string;
  readonly name!: string;
  readonly score!: number;
  readonly workHours!: number;

  constructor({ _id, restaurantId, name, score, workHours }: Partial<IEmployee>) {
    if (!_id) this._id = uuid(); else this._id = _id;
    if(name) this.name = name;
    if(restaurantId) this.restaurantId = restaurantId;
    if(score) this.score = score;
    if(workHours) this.workHours = workHours;
  }

  public toObject(): IEmployee {
    return {...this};
  }
}

const EmployeeSchema: Schema = new Schema({
  _id: { type: String, required: true },
  restaurantId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  workHours: { type: Number, required: true },
}, {
  timestamps: true
});

export const EmployeeModel = mongoose.models.EmployeeModel || mongoose.model('EmployeeModel', EmployeeSchema, Collections.employees);
