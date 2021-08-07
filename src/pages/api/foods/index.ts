import type { NextApiRequest, NextApiResponse } from 'next'
import { IFood } from '../../../models';
// import Food, { IFood } from '../../../models/Food'
import dbConnect from '../../../server/mongo'
import { FoodService } from '../../../service/Food';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    const foodService = new FoodService();
    const foods = await foodService.getFoods();

    const sortedFoods = foodService.sortFoodsByName(foods)

    return res.status(200).json(sortedFoods);
  } catch (err) {
    return res.status(500).end();
  }
}
