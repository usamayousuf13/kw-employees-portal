// src/tasks/tasks.controller.ts

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../../mongoose/schema/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':username')
  async createTask(
    @Param('username') username: string,
    @Body('title') title: string,
  ): Promise<any> {
    try {
      this.tasksService.createTask(username, title);
      return {
        message: 'task created successfully',
      };
    } catch (err) {
      return {
        message: 'Error while creating task',
      };
    }
  }

  @Get(':username')
  async getTasks(
    @Param('username') username: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(username, offset, limit);
  }

  @Put(':taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() updates: Partial<Task>,
  ): Promise<Task> {
    return this.tasksService.updateTask(taskId, updates);
  }

  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: string): Promise<any> {
    try {
      await this.tasksService.deleteTask(taskId);
      return {
        message: 'task deleted successfully',
      };
    } catch (err) {
      return {
        message: 'Error while deleting task',
      };
    }
  }
}
