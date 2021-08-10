import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../server/mongo'
import { EmployeeService } from '../../../service';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { restaurantId } = req.query

  try {
    const employeesService = new EmployeeService();
    const employees = await employeesService.getEmployees(restaurantId as string);

    const sortedEmployees = employeesService.sortEmployeesByName(employees)

    return res.status(200).json(sortedEmployees);
  } catch (err) {
    return res.status(500).end();
  }
}
