import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo, TodoSchema } from './todos/schemas/todo.schema';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';
import { TodosService } from './todos/todos.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://boryan_admin:xOIwywJmbECSUJY4@cluster0.jroae.mongodb.net',
      {
        dbName: 'todo_db',
      },
    ),
    TodosModule,
  ],
  controllers: [AppController, TodosController],
  providers: [AppService],
})
export class AppModule {}
