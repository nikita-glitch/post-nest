import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTopcategoryDto } from './dto/create-topcategory.dto';
import { UpdateTopcategoryDto } from './dto/update-topcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topcategory } from './entities/topcategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopcategoryService {
  constructor(
    @InjectRepository(Topcategory)
    private topcategoryRep: Repository<Topcategory>,
  ) {}

  async create(createTopcategoryDto: CreateTopcategoryDto) {
    const isNameExist = await this.topcategoryRep.findOneBy({
      name: createTopcategoryDto.name,
    });
    if (isNameExist) {
      throw new HttpException('Topcategory with this name already exists', HttpStatus.BAD_REQUEST)
    }
    const topcategory = this.topcategoryRep.create({
      name: createTopcategoryDto.name,
    });
    await this.topcategoryRep.save(topcategory);
  }

  async findAll() {
    return this.topcategoryRep.find();
  }

  async update(
    topcategoryId: number,
    updateTopcategoryDto: UpdateTopcategoryDto,
  ) {
    const isNameExist = await this.topcategoryRep.findOneBy({
      name: UpdateTopcategoryDto.name,
    });
    if (isNameExist) {
      throw new HttpException('Topcategory with this name already exists', HttpStatus.BAD_REQUEST)
    }
    await this.topcategoryRep.update(topcategoryId, {
      name: updateTopcategoryDto.name,
    });
  }

  async remove(topcategoryId: number) {
    const topcategory = await this.topcategoryRep.findOneBy({
      id: topcategoryId,
    });
    if (topcategory) {
      throw new HttpException('Topcategory not found', HttpStatus.NOT_FOUND)
    }
    await this.topcategoryRep.remove(topcategory);
  }
}
