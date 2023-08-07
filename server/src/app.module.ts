import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [PizzasModule, IngredientsModule, OperationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
