import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OperationSchema } from './schema/operation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Operation', schema: OperationSchema }]),
  ],
  controllers: [OperationsController],
  providers: [OperationsService],
})
export class OperationsModule {}
