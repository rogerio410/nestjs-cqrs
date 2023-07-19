import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TaskCompleteCommand } from './cqrs/TaskComplete.command';
import { TaskCreateCommand } from './cqrs/TaskCreate.command';
import { TaskGetAllQuery } from './cqrs/TaskGetAll.query';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private command: CommandBus, private query: QueryBus) {}

  create({ name }: CreateTaskDto) {
    return this.command.execute(new TaskCreateCommand(name));
  }

  findAll() {
    return this.query.execute(new TaskGetAllQuery());
  }

  complete(id: string) {
    return this.command.execute(new TaskCompleteCommand(id));
  }
}
