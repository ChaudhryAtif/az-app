import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CatService } from './cat.service';
import { Cat } from './cat.entity';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) { }

  @Get()
  findAll(): Cat[] {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Cat {
    return this.catService.findOne(id);
  }

  @Post()
  create(@Body() cat: Cat) {
    this.catService.create(cat);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() cat: Cat) {
    this.catService.update(id, cat);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.catService.delete(id);
  }
}
