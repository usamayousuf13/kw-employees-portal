import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../mongoose/schema/user.schema';
import { Invite } from '../../mongoose/schema/invite.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Invite.name) private readonly inviteModel: Model<Invite>,
  ) {}

  async register(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async login(username: string, password: string): Promise<User | null> {
    return this.userModel.findOne({ username, password }).exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    console.log(username);
    return this.userModel.findOne({ username }).exec();
  }

  async updateUserInvitationToken(
    username: string,
    token: string,
    expiration: Date,
  ): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate(
        { username },
        { $set: { invitationToken: token, invitationExpiration: expiration } },
        { new: true },
      )
      .exec();
  }

  async createInvitation(username: string, expiration: Date): Promise<Invite> {
    const invitationToken = uuidv4();
    const invite = new this.inviteModel({
      username,
      token: invitationToken,
      expiration,
    });
    return invite.save();
  }

  async validateInvitation(invitationToken: string): Promise<boolean> {
    const invite = await this.inviteModel
      .findOne({
        token: invitationToken,
        expiration: { $gte: new Date() },
      })
      .exec();

    if (!invite) {
      // Token is invalid or expired
      throw new Error('Invalid or expired invitation token');
    }

    return true;
  }
}
