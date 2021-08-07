import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../server/mongo'
import { FoodService } from '../../../service/Food';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await dbConnect();

  const { id } = req.query

  try {
    const foodService = new FoodService();
    const food = await foodService.getFoodById(id as string);

    return res.status(200).json(food?.toObject());
  } catch (err) {
    return res.status(500).end();
  }
}
