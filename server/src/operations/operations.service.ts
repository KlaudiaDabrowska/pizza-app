import { Injectable } from '@nestjs/common';

let operations = [
  { id: 1, name: 'krojenie' },
  { id: 2, name: 'smażenie' },
  { id: 3, name: 'pieczenie' },
];

@Injectable()
export class OperationsService {
  getAll(): any[] {
    return operations;
  }
  getById(id: number): any {
    return operations.find((operation) => operation.id === id);
  }

  add(name: string): any {
    const id = Math.floor(Math.random() * 100);
    const newOperation = { id, name };
    operations.push(newOperation);
    return operations;
  }

  remove(id: number): any {
    operations = operations.filter((operation) => operation.id !== id);
  }

  edit(id: number, name: string): any {
    const operation = operations.find((operation) => operation.id === id);
    operation.name = name;
    return operation;
  }
}
