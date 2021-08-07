import mongoose, { Document } from 'mongoose';

interface Read<T> {

  findOne: (obj: any) => Promise<(T & Document<any, {}>) | null>
}

interface Write<T> {
  create: (item: Partial<T>) => Promise<void>
  update(_id: string, data: Partial<T>): Promise<void>;
  delete: (_id: string) => Promise<void>
}

interface Read<T> {
  findOne: (obj: any) => Promise<(T & Document<any, {}>) | null>
}

interface Write<T> {
  create: (item: Partial<T>) => Promise<void>
  update(_id: string, data: Partial<T>): Promise<void>;
  delete: (_id: string) => Promise<void>
}


class BaseRepository<T> implements Read<T>, Write<T> {
  protected model: mongoose.Model<T & mongoose.Document>;

  constructor (schemaModel: mongoose.Model<T & mongoose.Document>) {
    this.model = schemaModel;
  }

  async create (item: Partial<T>) {
    await this.model.create(item);
  }

  async findOne (obj: any) {
    return await this.model.findOne(obj);
  }

  async findById(_id: string) {
    return await this.model.findById(_id);
  }

  async find (obj: any) {
    return await this.model.find(obj);
  }

  async update (_id: string, item: Partial<T>) {
    await this.model.findByIdAndUpdate(_id, item as any);
  }

  async delete (_id: string) {
    await this.model.findByIdAndDelete({ _id });
  }
}

export {
  BaseRepository
};
