import { Document } from "mongoose";
import { Order, OrderModel, IOrder, ExcludeFood } from "../models";
import { BaseRepository } from "../repositories";


export class OrderService {
  private repository = new BaseRepository<IOrder>(OrderModel);

  private objectToOrderInstance(obj: (IOrder & Document)) {
    return new Order(obj.toObject());
  }

  public async createOrder(restaurantId: string, shipping: number, cost: number, options: ExcludeFood[]) {
    const order = new Order({ restaurantId, shipping, cost, options });

    await this.repository.create(order.toObject());
    return order._id;
  }

  public async getOrderById(_id: string, restaurantId?: string) {
    const filter = !restaurantId ? { _id } : { _id, restaurantId }
    const orderObj = await this.repository.findOne(filter);

    if (!orderObj) return null

    return this.objectToOrderInstance(orderObj)
  }

  public async getOrders(restaurantId?: string, options = {}) {
    const filter = !restaurantId ? options : { restaurantId, ...options }
    const orderObjs = await this.repository.find(filter);

    return orderObjs.map((f) => this.objectToOrderInstance(f))
  }

  public async updateOrderById(_id: string, obj: Partial<IOrder>) {
    await this.repository.update(_id, obj)
  }
}
