import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InviteDocument = Invite & Document;

@Schema()
export class Invite {
  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true })
  expiration: Date;

  @Prop({ required: true })
  username: string; // we want to associate the invite with the admin user
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
