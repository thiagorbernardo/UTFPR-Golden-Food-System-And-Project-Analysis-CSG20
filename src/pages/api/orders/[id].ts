import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../server/mongo'
import { OrderService } from '../../../service/Order';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await dbConnect();

  const { id } = req.query

  try {
    const orderService = new OrderService();
    const order = await orderService.getOrderById(id as string);

    return res.status(200).json(order?.toObject());
  } catch (err) {
    return res.status(500).end();
  }
}