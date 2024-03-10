import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'Client' })
  role: string;

  @Prop()
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: null })
  invitationToken: string; // to store the invitation token

  @Prop({ default: null })
  invitationExpiration: Date; // to store the invitation expiration date
}

export const UserSchema = SchemaFactory.createForClass(User);
