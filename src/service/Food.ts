import { Document } from "mongoose";
import { Food, FoodModel, IFood } from "../models";
import { BaseRepository } from "../repositories";


export class FoodService {
  private repository = new BaseRepository<IFood>(FoodModel);

  private objectToFoodInstance(obj: (IFood & Document)) {
    return new Food(obj.toObject());
  }

  public async createFood(name: string, ingredients: string[], price: number) {
    const food = new Food({ name, ingredients, price });

    await this.repository.create(food.toObject());
  }

  public async getFoodById(_id: string) {
    const foodObj = await this.repository.findById(_id);

    if (!foodObj) return null

    return this.objectToFoodInstance(foodObj)
  }

  public async getFoods() {
    const foodObjs = await this.repository.find({});

    return foodObjs.map((f) => this.objectToFoodInstance(f))
  }

  public sortFoodsByName(foods: Food[]) {
    return foods.sort((a: Food, b: Food) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  }

  public async removeFoodById(_id: string) {
    await this.repository.delete(_id)
  }

  public async updateFoodById(_id: string, obj: Partial<IFood>) {
    await this.repository.update(_id, obj)
  }
}
