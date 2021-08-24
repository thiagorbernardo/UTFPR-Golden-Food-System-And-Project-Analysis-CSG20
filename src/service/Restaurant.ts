import { Document } from "mongoose";
import { Restaurant, RestaurantModel, IRestaurant } from "../models";
import { BaseRepository } from "../repositories";
import { OrderService } from "./Order";
import { OrderStatus } from "../enum";
import { startOfToday, endOfToday } from 'date-fns'

export class RestaurantService {
  private repository = new BaseRepository<IRestaurant>(RestaurantModel);
  private ordersService = new OrderService()

  private objectToRestaurantInstance(obj: (IRestaurant & Document)) {
    return new Restaurant(obj.toObject());
  }

  public async createRestaurant(name: string, city: string) {
    const food = new Restaurant({ name, city });

    await this.repository.create(food.toObject());

    return food._id
  }

  public async getRestaurantById(_id: string) {
    const foodObj = await this.repository.findById(_id);

    if (!foodObj) return null

    return this.objectToRestaurantInstance(foodObj)
  }

  public async getRestaurants() {
    const foodObjs = await this.repository.find({});

    return foodObjs.map((f) => this.objectToRestaurantInstance(f))
  }

  public sortRestaurantsByName(restaurants: Restaurant[]) {
    return restaurants.sort((a: Restaurant, b: Restaurant) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  }

  public async removeRestaurantById(_id: string) {
    await this.repository.delete(_id)
  }

  public async updateRestaurantById(_id: string, obj: Partial<IRestaurant>) {
    await this.repository.update(_id, obj)
  }

  public async getProfit(_id: string) {
    const dailyOrders = await this.ordersService.getOrders(_id, { createdAt: { $gte: startOfToday(), $lt: endOfToday() }, status: OrderStatus.delivered })

    const dailyProfit = dailyOrders.reduce((acc, current) => acc + current.calculateCost(), 0)

    return dailyProfit
  }
}
