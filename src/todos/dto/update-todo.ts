import { AddTodoDto } from './add-todo';

export class UpdateTodoDto extends AddTodoDto {
  id: string;
  prop: 'task' | 'isCompleted';
  val: string | boolean;
  ids: string[];
  complete: boolean;
}
