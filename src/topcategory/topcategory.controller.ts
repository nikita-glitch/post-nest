import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { TopcategoryService } from './topcategory.service';
import { CreateTopcategoryDto } from './dto/create-topcategory.dto';
import { UpdateTopcategoryDto } from './dto/update-topcategory.dto';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/Guards/authGuard';
import { Response } from 'express';

@Controller('topcategory')
export class TopcategoryController {
  constructor(
    private readonly topcategoryService: TopcategoryService,
    ) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Post('topcategory')
  async create(
    @Body() 
    createTopcategoryDto: CreateTopcategoryDto,
    @Res() res: Response
    ) {
    await this.topcategoryService.create(createTopcategoryDto);
    res.status(HttpStatus.CREATED).json({ message: 'Topcategory has been created succsessfully'})
  }

  @Roles('user')
  @Get('topcategory')
  async findAll(
    @Res() res: Response
  ) {
    res.status(HttpStatus.OK).json(await this.topcategoryService.findAll())
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch('topcategory')
  async update(
    @Body() 
    updateTopcategoryDto: UpdateTopcategoryDto, 
    topcategoryId: number,
    @Res() res: Response
    ) {
    await this.topcategoryService.update(topcategoryId, updateTopcategoryDto);
    res.status(HttpStatus.OK).json({ message: 'Topcategory has been updated succsessfully'})
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete('topcategory')
  async remove(
    @Body() topcategoryId: number,
    @Res() res: Response
    ) {
    await this.topcategoryService.remove(topcategoryId);
    res.status(HttpStatus.OK).json({ message: 'Topcategory has been deleted succsessfully'})
  }
}
