import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../../users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userService = app.get(UsersService);

  // Create the first admin user
  const adminUser = {
    username: 'admin',
    password: 'adminPassword',
    role: 'Admin',
  };

  await userService.register(adminUser);

  console.log('Seeder: Admin user created successfully.');

  await app.close();
}

bootstrap();
