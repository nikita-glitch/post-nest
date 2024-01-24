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
  UsePipes,
  Param,
  Req,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/Guards/authGuard';
import { Response, Request } from 'express';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { createSubcategorySchema, updateSubcategorySchema } from 'src/validationSchemas/subcategory.schema';

@Controller('subcategories')
export class SubcategoryController {
  constructor(private subcategoryService: SubcategoryService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe(createSubcategorySchema))
  @Post('')
  async create(
    @Body()
    createSubcategoryDto: CreateSubcategoryDto,
    @Res() res: Response,
  ) {    
    await this.subcategoryService.create(createSubcategoryDto);
    res.status(HttpStatus.CREATED).json({ message: 'Subcategory has been created succsessfully' });
  }

  //@Roles('user')
  @Get('')
  async findAll(
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.subcategoryService.findAll())
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe(updateSubcategorySchema))
  @Patch(':id')
  async update(
    @Body() 
    updateSubcategoryDto: UpdateSubcategoryDto, 
    @Param('id')
    subcategoryId: number,
    @Res() res: Response
    ) {
      await this.subcategoryService.update(subcategoryId, updateSubcategoryDto)
      res.status(HttpStatus.OK).json({ message: 'Subcategory has been updated succsessfully' });
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id')
    subcategoryId: number,
    @Res() res: Response
  ) {
    await this.subcategoryService.remove(subcategoryId);
    res.status(HttpStatus.OK).json({ message: 'Subcategory has been deleted succsessfully' });
  }

  @Roles('user')
  @Get('topcategories/:id/subcategories')
  async getTopcategorySubcategories(
    @Param('id')
    topcategoryId: number,
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.subcategoryService.getTopcategorySubcategories(topcategoryId));
  }
}
