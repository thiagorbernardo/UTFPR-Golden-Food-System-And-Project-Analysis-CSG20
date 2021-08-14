import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../server/mongo'
import { RestaurantService } from '../../../service';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await dbConnect();

  const { id, filter } = req.query

  try {
    const restaurantService = new RestaurantService();

    const restaurant = await restaurantService.getRestaurantById(id as string);
    if (!restaurant) return res.status(400).end()

    const profit = await restaurantService.getProfit(id as string)
    return res.status(200).json({restaurant: restaurant.toObject(), profit});



  } catch (err) {
    return res.status(500).end();
  }
}
