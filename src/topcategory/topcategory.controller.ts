import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, UsePipes } from '@nestjs/common';
import { TopcategoryService } from './topcategory.service';
import { CreateTopcategoryDto } from './dto/create-topcategory.dto';
import { UpdateTopcategoryDto } from './dto/update-topcategory.dto';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/Guards/authGuard';
import { Response } from 'express';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { TopcategorySchema } from 'src/validationSchemas/topcategory.schema';

@Controller('topcategories')
export class TopcategoryController {
  constructor(
    private readonly topcategoryService: TopcategoryService,
    ) {}

  @Post('')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe(TopcategorySchema))
  async create(
    @Body() 
    createTopcategoryDto: CreateTopcategoryDto,
    @Res() res: Response
    ) {
    await this.topcategoryService.create(createTopcategoryDto);
    res.status(HttpStatus.CREATED).json({ message: 'Topcategory has been created succsessfully'})
  }

  @Get('')
  async findAll(
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.topcategoryService.findAll())
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe(TopcategorySchema))
  async update(
    @Body() 
    updateTopcategoryDto: UpdateTopcategoryDto, 
    @Param('id')
    topcategoryId: number,
    @Res() res: Response
    ) {
    await this.topcategoryService.update(topcategoryId, updateTopcategoryDto);
    res.status(HttpStatus.OK).json({ message: 'Topcategory has been updated succsessfully'})
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async remove(
    @Param('id') topcategoryId: number,
    @Res() res: Response
    ) {
    await this.topcategoryService.remove(topcategoryId);
    res.status(HttpStatus.OK).json({ message: 'Topcategory has been deleted succsessfully'})
  }

  @Get(':id/subcategories')
  async getTopcategorySubcategories(
    @Param('id')
    topcategoryId: number,
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.topcategoryService.getTopcategorySubcategories(topcategoryId));
  }
}
