import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddTodoDto } from './dto/add-todo';
import { UpdateManyDto } from './dto/update-many';
import { UpdateTodoDto } from './dto/update-todo';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async add(AddTodoDto: AddTodoDto): Promise<Todo> {
    const addedTodo = new this.todoModel(AddTodoDto);
    console.log('AddTodoDto :>> ', AddTodoDto);

    return addedTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async update(id: string, { prop, val }: UpdateTodoDto): Promise<Todo> {
    console.log(UpdateTodoDto);
    return this.todoModel
      .findOneAndUpdate({ _id: id }, { $set: { [prop]: val } })
      .exec();
  }

  async deleteCompleted(): Promise<void> {
    this.todoModel.deleteMany({ isCompleted: true }).exec();
  }

  async toggleAll({ ids, complete }: UpdateManyDto): Promise<void> {
    this.todoModel
      .updateMany({ _id: { $in: ids } }, { $set: { isCompleted: complete } })
      .exec();
  }
}
