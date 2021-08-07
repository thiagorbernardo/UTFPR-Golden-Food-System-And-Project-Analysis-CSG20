// export class Menu {
//   private _id: string;
//   private restaurantId: string;
//   private dessert: Food[];
//   private drinks: Food[];
//   private mainCourse: Food[];
//   private general: Food[];
//   private unavailableFoods: string[];
// }

// import { v4 as uuid } from 'uuid';

// export interface IEmployee {
//   readonly _id: string;
//   readonly restaurantId: string;
//   readonly name: string;
//   readonly score: number;
//   readonly workHours: number;
// }

// export class Employee {
//   readonly _id: string;
//   readonly restaurantId: string;
//   readonly name: string;
//   readonly score: number;
//   readonly workHours: number;

//   constructor({ restaurantId, name, score, workHours }: Omit<IEmployee, "_id">) {
//     this._id = uuid();
//     this.name = name;
//     this.restaurantId = restaurantId;
//     this.score = score;
//     this.workHours = workHours;
//   }

//   public toObject(): IEmployee {
//     return {...this}
//     return {
//       _id: this._id,
//       name: this.name,
//       restaurantId: restaurantId,
//       score: score,
//       workHours: workHours
//     };
//   }
// }
