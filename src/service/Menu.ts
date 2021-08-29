import { Document } from "mongoose";
import { Menu, MenuModel, IMenu } from "../models";
import { BaseRepository } from "../repositories";
import { FoodService } from "./Food";


export class MenuService {
  private repository = new BaseRepository<IMenu>(MenuModel);
  private foodService = new FoodService();

  private objectToMenuInstance(obj: (IMenu & Document)) {
    return new Menu(obj.toObject());
  }

  public async createMenu(restaurantId: string, dessert: string[], drinks: string[], general: string[], mainCourse: string[], unavailableFoods: string[]) {
    const menu = new Menu({ restaurantId, dessert, drinks, general, mainCourse, unavailableFoods });

    await this.repository.create(menu.toObject());
  }

  public async getMenuByRestaurantId(restaurantId: string) {
    const menuObj = await this.repository.findOne({ restaurantId });

    if (!menuObj) return null

    return this.objectToMenuInstance(menuObj)
  }

  public async removeMenuById(_id: string) {
    await this.repository.delete(_id)
  }

  public async updateMenuById(_id: string, obj: Partial<IMenu>) {
    await this.repository.update(_id, obj)
  }

  public async getFoodsFromMenu(menu: Menu) {
    const options = [...menu.dessert, ...menu.drinks, ...menu.general, ...menu.mainCourse]

    const availableOptions = options.filter(value => !menu.unavailableFoods.includes(value))

    const foods = await this.foodService.getFoods(availableOptions);
    const sortedFoods = this.foodService.sortFoodsByName(foods)

    return sortedFoods;
  }
}
