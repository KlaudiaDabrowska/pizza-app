import { CreateOperationDto } from './create-operation.dto';
import { PartialType } from '@nestjs/mapped-types';

export class EditOperationDto extends PartialType(CreateOperationDto) {}
