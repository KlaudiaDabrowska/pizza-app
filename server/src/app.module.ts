import { Module } from '@nestjs/common';
import { PizzasModule } from './pizzas/pizzas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    PizzasModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      auth: {
        password: process.env.MONGO_DB_PASSWORD,
        username: process.env.MONGO_DB_USERNAME,
      },
      dbName: process.env.MONGO_DB_NAME,
    }),
  ],
})
export class AppModule {}
