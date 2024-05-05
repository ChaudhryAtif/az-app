import { Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: string): Cat {
    return this.cats.find(cat => cat.id === id);
  }

  create(cat: Cat) {
    this.cats.push(cat);
  }

  update(id: string, cat: Cat) {
    const index = this.cats.findIndex(cat => cat.id === id);
    if (index !== -1) {
      this.cats[index] = cat;
    }
  }

  delete(id: string) {
    const index = this.cats.findIndex(cat => cat.id === id);
    if (index !== -1) {
      this.cats.splice(index, 1);
    }
  }
}
