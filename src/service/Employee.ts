import { Document } from "mongoose";
import { Employee, EmployeeModel, IEmployee } from "../models";
import { BaseRepository } from "../repositories";


export class EmployeeService {
  private repository = new BaseRepository<IEmployee>(EmployeeModel);

  private objectToEmployeeInstance(obj: (IEmployee & Document)) {
    return new Employee(obj.toObject());
  }

  public async createEmployee(name: string, restaurantId: string, score: number, workHours: number) {
    const employee = new Employee({ name, restaurantId, score, workHours });

    await this.repository.create(employee.toObject());
  }

  public async getEmployeeById(_id: string, restaurantId?: string) {
    const filter = !restaurantId ? { _id } : { _id, restaurantId }
    const employeeObj = await this.repository.findOne(filter);

    if (!employeeObj) return null

    return this.objectToEmployeeInstance(employeeObj)
  }

  public async getEmployees(restaurantId?: string) {
    const filter = !restaurantId ? {} : { restaurantId }
    const employeeObjs = await this.repository.find(filter);

    return employeeObjs.map((f) => this.objectToEmployeeInstance(f))
  }

  public sortEmployeesByName(employees: Employee[]) {
    return employees.sort((a: Employee, b: Employee) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  }

  public async removeEmployeeById(_id: string) {
    await this.repository.delete(_id)
  }

  public async updateEmployeeById(_id: string, obj: Partial<IEmployee>) {
    await this.repository.update(_id, obj)
  }
}
