import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { EditOperationDto } from './dtos/edit-operation.dto';

@Controller('operations')
export class OperationsController {
  constructor(private operationsService: OperationsService) {}
  @Get()
  getOperations() {
    return this.operationsService.getAll();
  }

  @Get('/:id')
  getOperation(@Param('id') id: string) {
    return this.operationsService.getById(id);
  }

  @Post()
  addOperation(@Body() body: CreateOperationDto) {
    return this.operationsService.add(body);
  }

  @Patch('/:id')
  editOperation(@Body() body: EditOperationDto, @Param('id') id: string) {
    return this.operationsService.edit(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  removeOperation(@Param('id') id: string) {
    return this.operationsService.remove(id);
  }
}
