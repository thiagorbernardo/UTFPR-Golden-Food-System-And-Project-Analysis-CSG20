import type { NextApiRequest, NextApiResponse } from 'next'

import { IFood } from '../../../models';
import dbConnect from '../../../server/mongo'
import { FoodService } from '../../../service/Food';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    const foodService = new FoodService();
    const { _id, name, ingredients, price } = req.body

    switch (req.method) {
      case 'GET':
        const foods = await foodService.getFoods();

        const sortedFoods = foodService.sortFoodsByName(foods)

        return res.status(200).json(sortedFoods);
      case 'POST':
        const id = await foodService.createFood(name, ingredients, price)

        return res.status(200).json({ id })
      case 'PATCH':
        await foodService.updateFoodById(_id, { name, ingredients, price })

        return res.status(200).end()
      default:
        break;
    }
  } catch (err) {
    return res.status(500).end();
  }
}
