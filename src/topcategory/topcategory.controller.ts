import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopcategoryService } from './topcategory.service';
import { CreateTopcategoryDto } from './dto/create-topcategory.dto';
import { UpdateTopcategoryDto } from './dto/update-topcategory.dto';

@Controller('topcategory')
export class TopcategoryController {
  constructor(private readonly topcategoryService: TopcategoryService) {}

  @Post()
  create(@Body() createTopcategoryDto: CreateTopcategoryDto) {
    return this.topcategoryService.create(createTopcategoryDto);
  }

  @Get()
  findAll() {
    return this.topcategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topcategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopcategoryDto: UpdateTopcategoryDto) {
    return this.topcategoryService.update(+id, updateTopcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topcategoryService.remove(+id);
  }
}
