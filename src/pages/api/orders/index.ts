import type { NextApiRequest, NextApiResponse } from 'next'
import { ExcludeFood } from '../../../models/Order';

import dbConnect from '../../../server/mongo'

import { OrderService } from '../../../service/';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { restaurantId, shipping, cost, options, _id } = req.query
  try {

    const ordersService = new OrderService();
    const orders = await ordersService.getOrders(restaurantId as string);

    switch (req.method) {
      case 'GET':
        const orders = await ordersService.getOrders(restaurantId as string);

        if (!orders) return res.status(400).end()

        return res.status(200).json(orders);
      case 'POST':

        const id = await ordersService.createOrder(restaurantId as string, +shipping, +cost, options as unknown as ExcludeFood[])

        return res.status(200).json({id})
      case 'PATCH':
        console.log(_id, shipping, cost, options)
        await ordersService.updateOrderById(_id as string, {shipping: +shipping, cost: +cost, options: options as unknown as ExcludeFood[]})

        return res.status(200).end()
      default:
        break;
    }
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}