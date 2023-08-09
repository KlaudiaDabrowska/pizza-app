import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Operation {
  @Prop({ required: true, unique: true })
  name: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
