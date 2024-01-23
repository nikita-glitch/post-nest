import { Injectable } from '@nestjs/common';
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
      // TODO
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
       // TODO
    }
    await this.topcategoryRep.remove(topcategory);
  }
}
