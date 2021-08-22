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
    const { _id, name, city } = req.body

    switch (req.method) {
      case 'GET':
        const restaurants = await restaurantsService.getRestaurants();

        if (!restaurants) return res.status(400).end()

        const sortedFoods = restaurantsService.sortRestaurantsByName(restaurants)
        return res.status(200).json(sortedFoods);
      case 'POST':

        const id = await restaurantsService.createRestaurant(name, city)

        return res.status(200).json({id})
      case 'PATCH':
        await restaurantsService.updateRestaurantById(_id, { name, city })

        return res.status(200).end()
      default:
        break;
    }
  } catch (err) {
    return res.status(500).end();
  }
}
