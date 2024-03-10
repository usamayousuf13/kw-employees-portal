import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from '../../mongoose/schema/user.schema';
import { Invite, InviteSchema } from '../../mongoose/schema/invite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Invite.name, schema: InviteSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
