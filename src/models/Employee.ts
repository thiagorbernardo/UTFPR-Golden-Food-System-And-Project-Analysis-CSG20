import { v4 as uuid } from 'uuid';

export interface IEmployee {
  readonly _id: string;
  readonly restaurantId: string;
  readonly name: string;
  readonly score: number;
  readonly workHours: number;
}

export class Employee {
  readonly _id: string;
  readonly restaurantId: string;
  readonly name: string;
  readonly score: number;
  readonly workHours: number;

  constructor({ restaurantId, name, score, workHours }: Omit<IEmployee, "_id">) {
    this._id = uuid();
    this.name = name;
    this.restaurantId = restaurantId;
    this.score = score;
    this.workHours = workHours;
  }
}
