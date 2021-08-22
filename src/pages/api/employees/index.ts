import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../server/mongo'
import { EmployeeService } from '../../../service';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { restaurantId } = req.query
  const { _id, name, score, workHours } = req.body

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
      const id = await employeesService.createEmployee(name as string, restaurantId as string, +score, +workHours)

      return res.status(200).json({ id })
    case 'PATCH':
      await employeesService.updateEmployeeById(_id as string, { name: name as string, restaurantId: restaurantId as string, score: +score, workHours: +workHours })

      return res.status(200).end()
    default:
      break;
  }
}

