import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../server/mongo'
import { MenuService } from '../../../service/Menu';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await dbConnect();

  const { id } = req.query

  try {
    const menuService = new MenuService();
    const menu = await menuService.getMenuByRestaurantId(id as string);

    return res.status(200).json(menu?.toObject());
  } catch (err) {
    return res.status(500).end();
  }
}
