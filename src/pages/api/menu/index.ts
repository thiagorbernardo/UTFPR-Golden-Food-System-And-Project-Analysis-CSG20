import type { NextApiRequest, NextApiResponse } from 'next'
import { Food } from '../../../models';
import dbConnect from '../../../server/mongo'
import { MenuService } from '../../../service';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { restaurantId } = req.query
  const { _id, dessert, drinks, general, mainCourse, unavailableFoods } = req.body

  const menuService = new MenuService();
  try {
    switch (req.method) {
      case 'GET':
        const menu = await menuService.getMenuByRestaurantId(restaurantId as string);
        let foods: Food[] = []
        if (menu) foods = await menuService.getFoodsFromMenu(menu)

        return res.status(200).json({ menu, foods });
      case 'POST':
        const id = await menuService.createMenu(restaurantId as string, dessert, drinks, general, mainCourse, unavailableFoods)

        return res.status(200).json({ id })
      case 'PATCH':
        await menuService.updateMenuById(_id as string, { dessert, drinks, general, mainCourse, unavailableFoods })

        return res.status(200).end()
      default:
        break;

    }
  } catch (err) {
    return res.status(500).end();
  }
}
