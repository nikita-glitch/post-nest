import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/Guards/authGuard';
import { Response } from 'express';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private subcategoryService: SubcategoryService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Post('subcategory')
  async create(
    @Body()
    createSubcategoryDto: CreateSubcategoryDto,
    topcategoryName: string,
    @Res() res: Response,
  ) {
    await this.subcategoryService.create(createSubcategoryDto, topcategoryName);
    res.status(HttpStatus.CREATED).json({ message: 'Subcategory has been created succsessfully' });
  }

  @Roles('user')
  @Get('')
  async findAll(
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.subcategoryService.findAll())
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch('subcategory')
  async update(
    @Body() 
    updateSubcategoryDto: UpdateSubcategoryDto, 
    subcategoryId: number,
    @Res() res: Response
    ) {
      await this.subcategoryService.update(subcategoryId, updateSubcategoryDto)
      res.status(HttpStatus.OK).json({ message: 'Subcategory has been updated succsessfully' });
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete('subcategory')
  async remove(
    @Body()
    subcategoryId: number,
    @Res() res: Response
  ) {
    await this.subcategoryService.remove(subcategoryId);
    res.status(HttpStatus.OK).json({ message: 'Subcategory has been deleted succsessfully' });
  }

  @Roles('user')
  @Get('')
  async getTopcategorySubcategories(
    @Body()
    topcategoryId: number,
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.subcategoryService.getTopcategorySubcategories(topcategoryId));
  }
}
