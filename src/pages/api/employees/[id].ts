import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../server/mongo'
import { EmployeeService } from '../../../service';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await dbConnect();

  const { id } = req.query

  try {
    const employeeService = new EmployeeService();
    const employee = await employeeService.getEmployeeById(id as string);

    return res.status(200).json(employee?.toObject());
  } catch (err) {
    return res.status(500).end();
  }
}
