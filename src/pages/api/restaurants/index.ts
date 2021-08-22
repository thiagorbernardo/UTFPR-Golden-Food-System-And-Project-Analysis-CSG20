import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../server/mongo'

import { RestaurantService } from '../../../service/';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    const restaurantsService = new RestaurantService();

    switch (req.method) {
      case 'GET':
        const restaurants = await restaurantsService.getRestaurants();

        if (!restaurants) return res.status(400).end()

        const sortedFoods = restaurantsService.sortRestaurantsByName(restaurants)
        return res.status(200).json(sortedFoods);
      case 'POST':
        const { name, city } = req.body
        console.log(name, city)
        await restaurantsService.createRestaurant(name as string, city as string)
        res.status(200).end()
      default:
        break;
    }
  } catch (err) {
    return res.status(500).end();
  }
}
