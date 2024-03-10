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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from '../../mongoose/schema/task.schema';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({
    summary:
      'Create a new task for a user. Pass title in body. Ex: {"title":"brush teeth"}',
  })
  @ApiCreatedResponse({ description: 'Task created successfully' })
  @ApiBadRequestResponse({
    description: 'Error while creating task or Bad Request',
  })
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

  @ApiOperation({ summary: 'Get user tasks with pagination' })
  @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':username')
  async getTasks(
    @Param('username') username: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(username, offset, limit);
  }

  @ApiOperation({
    summary:
      'Update a task by ID. Pass data to update in body. Ex: {"completed":true}',
  })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put(':taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() updates: Partial<Task>,
  ): Promise<Task> {
    return this.tasksService.updateTask(taskId, updates);
  }

  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Error while deleting task or Bad Request',
  })
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
