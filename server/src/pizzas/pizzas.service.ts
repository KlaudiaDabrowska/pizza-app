import { Injectable } from '@nestjs/common';

let pizzas = [
  { id: 1, price: 20, name: 'Margarita' },
  { id: 2, price: 22, name: 'Hawajska' },
  { id: 3, price: 23, name: 'Pepperoni' },
];

@Injectable()
export class PizzasService {
  getAll(): any[] {
    return pizzas;
  }
  getById(id: number): any {
    return pizzas.find((pizza) => pizza.id === id);
  }

  add(name: string, price: number): any {
    const id = Math.floor(Math.random() * 100);
    const newPizza = { id, name, price };
    pizzas.push(newPizza);
    return pizzas;
  }

  remove(id: number): any {
    pizzas = pizzas.filter((pizza) => pizza.id !== id);
  }

  edit(id: number, price: number): any {
    const pizza = pizzas.find((pizza) => pizza.id === id);
    pizza.price = price;
    return pizza;
  }
}
