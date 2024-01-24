import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, UsePipes } from '@nestjs/common';
import { TopcategoryService } from './topcategory.service';
import { CreateTopcategoryDto } from './dto/create-topcategory.dto';
import { UpdateTopcategoryDto } from './dto/update-topcategory.dto';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/Guards/authGuard';
import { Response } from 'express';
import { IsPublic } from 'src/decorator/auth.decorator';
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

  @Roles('user')
  @Get('')
  async findAll(
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.topcategoryService.findAll())
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe(TopcategorySchema))
  @Patch(':id')
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

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id') topcategoryId: number,
    @Res() res: Response
    ) {
    await this.topcategoryService.remove(topcategoryId);
    res.status(HttpStatus.OK).json({ message: 'Topcategory has been deleted succsessfully'})
  }
}
