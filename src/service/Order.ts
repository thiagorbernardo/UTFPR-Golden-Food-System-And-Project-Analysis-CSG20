import { Document } from "mongoose";
import { Order, OrderModel, IOrder, IFood } from "../models";
import { BaseRepository } from "../repositories";


export class OrderService {
  private repository = new BaseRepository<IOrder>(OrderModel);

  private objectToOrderInstance(obj: (IOrder & Document)) {
    return new Order(obj.toObject());
  }

  public async createOrder(restaurantId: string, shipping: number, cost: number, options: IFood[]) {
    const oder = new Order({ restaurantId, shipping, cost, options });

    await this.repository.create(oder.toObject());
  }

  public async getOrderById(_id: string, restaurantId?: string) {
    const filter = !restaurantId ? { _id } : { _id, restaurantId }
    const oderObj = await this.repository.findOne(filter);

    if (!oderObj) return null

    return this.objectToOrderInstance(oderObj)
  }

  public async getOrders(restaurantId?: string) {
    const filter = !restaurantId ? {} : { restaurantId }
    const oderObjs = await this.repository.find(filter);

    return oderObjs.map((f) => this.objectToOrderInstance(f))
  }

  public async updateOrderById(_id: string, obj: Partial<IOrder>) {
    await this.repository.update(_id, obj)
  }
}
