import { Injectable } from '@nestjs/common';

let ingredients = [
  { id: 1, name: 'pepper' },
  { id: 2, name: 'pepperoni' },
  { id: 3, name: 'flour' },
];

@Injectable()
export class IngredientsService {
  getAll(): any[] {
    return ingredients;
  }
  getById(id: number): any {
    return ingredients.find((ingredient) => ingredient.id === id);
  }

  add(name: string): any {
    const id = Math.floor(Math.random() * 100);
    const newIngredient = { id, name };
    ingredients.push(newIngredient);
    return ingredients;
  }

  remove(id: number): any {
    ingredients = ingredients.filter((ingredient) => ingredient.id !== id);
  }

  edit(id: number, name: string): any {
    const ingredient = ingredients.find((ingredient) => ingredient.id === id);
    ingredient.name = name;
    return ingredient;
  }
}
