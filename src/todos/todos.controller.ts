import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo';
import { UpdateManyDto } from './dto/update-many';
import { UpdateTodoDto } from './dto/update-todo';
import { Todo } from './schemas/todo.schema';
import { TodosService } from './todos.service';

@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Post('add')
  async addTodo(@Body() addTodoDto: AddTodoDto): Promise<Todo> {
    return this.todosService.add(addTodoDto);
  }

  @Put('/:id/update')
  async updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param('id') id: string,
  ): Promise<Todo> {
    console.log(updateTodoDto);
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete()
  async deleteCompleted() {
    this.todosService.deleteCompleted();
  }

  @Put()
  async toggleAll(@Body() { ids, complete }: UpdateManyDto) {
    this.todosService.toggleAll({ ids, complete });
  }
}
