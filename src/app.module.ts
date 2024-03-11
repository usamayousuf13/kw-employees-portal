import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import { UserModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import constant from './util/constant';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [constant],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino/file',
          options: { destination: path.join(process.cwd(), 'app.log') },
        },
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
