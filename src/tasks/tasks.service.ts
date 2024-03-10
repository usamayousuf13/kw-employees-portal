import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../../mongoose/schema/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTask(username: string, title: string): Promise<Task> {
    const task = new this.taskModel({ username, title });
    return task.save();
  }

  async getTasks(
    username: string,
    offset: number,
    limit: number,
  ): Promise<Task[]> {
    return this.taskModel
      .find({ username })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(taskId, updates, { new: true })
      .exec();
  }

  async deleteTask(taskId: string): Promise<Task | null> {
    const deletedTask = await this.taskModel.findByIdAndDelete(taskId).exec();
    console.log('delete: ', deletedTask);
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return deletedTask;
  }
}
