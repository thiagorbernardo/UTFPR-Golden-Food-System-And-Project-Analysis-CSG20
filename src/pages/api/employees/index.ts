import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../server/mongo'
import { EmployeeService } from '../../../service';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { restaurantId } = req.query

  const employeesService = new EmployeeService();
  switch (req.method) {
    case 'GET':
      try {
        const employees = await employeesService.getEmployees(restaurantId as string);

        const sortedEmployees = employeesService.sortEmployeesByName(employees)

        return res.status(200).json(sortedEmployees);
      } catch (err) {
        return res.status(500).end();
      }
    case 'POST':
      await employeesService.createEmployee('Yuiti', '27f224c6-160c-4221-a5aa-b29c7741cdc1', 10, 7)
      res.end()
    default:
      break;
  }
}
