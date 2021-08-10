import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import { Collections } from "../enum";
import { OrderStatus } from "../enum/OrderStatus";
import { IFood } from "./Food";

export interface IOrder {
  readonly _id: string;
  readonly restaurantId: string;
  readonly createdAt: Date;
  readonly status: OrderStatus;
  readonly options: IFood[];
  readonly cost: number;
  readonly shipping: number;
}

export class Order {
  readonly _id: string;
  readonly restaurantId!: string;
  readonly createdAt!: Date;
  public status!: OrderStatus;
  readonly options!: IFood[];
  readonly cost!: number;
  readonly shipping!: number;

  constructor({ _id, restaurantId, createdAt, status, options, cost, shipping }: Partial<IOrder>) {
    if (!_id) this._id = uuid(); else this._id = _id;
    if(restaurantId) this.restaurantId = restaurantId
    if (!createdAt) this.createdAt = new Date(); else this.createdAt = createdAt;
    if (!status) this.status = OrderStatus.created; else this.status = status;
    if(options) this.options = options
    if(cost) this.cost = cost
    if(shipping) this.shipping = shipping
  }

  public toObject(): IOrder {
    return {...this};
  }

  public changeOrderStatus(status: OrderStatus) {
    this.status = status
  }
}

const PartialFoodSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true,
  _id: false
});


const OrderSchema: Schema = new Schema({
  _id: { type: String, required: true },
  restaurantId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  status: { type: String, required: true },
  options: { type: [PartialFoodSchema], required: true },
  cost: { type: Number, required: true },
  shipping: { type: Number, required: true },
}, {
  timestamps: true
});

export const OrderModel = mongoose.models.OrderModel || mongoose.model('OrderModel', OrderSchema, Collections.orders);
