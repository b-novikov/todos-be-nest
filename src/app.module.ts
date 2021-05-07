import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';
import { config } from 'dotenv';
config();
console.log(process.env.NEST_MONGODB);
@Module({
  imports: [
    MongooseModule.forRoot(process.env.NEST_MONGODB, {
      dbName: 'todo_db',
    }),
    TodosModule,
  ],
  controllers: [AppController, TodosController],
  providers: [AppService],
})
export class AppModule {}
