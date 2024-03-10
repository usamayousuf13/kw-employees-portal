// mongoose/schema/task.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema'; // Import the User schema

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  completedAt: Date;

  @Prop({ type: Boolean, default: false })
  completed: boolean;

  @Prop({ type: String, ref: 'User', required: true })
  username: string; // Reference to the User schema
}

export const TaskSchema = SchemaFactory.createForClass(Task);
