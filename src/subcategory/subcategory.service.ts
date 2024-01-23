import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';
import { Topcategory } from 'src/topcategory/entities/topcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRep: Repository<Subcategory>,
    @InjectRepository(Topcategory)
    private topcategoryRep: Repository<Topcategory>,
  ) {}

  async create(
    createSubcategoryDto: CreateSubcategoryDto,
    topcategoryName: string,
  ) {
    const topcategory = await this.topcategoryRep.findOneBy({
      name: topcategoryName,
    });
    if (!topcategory) {
       // TODO
    }
    const isNameExist = await this.subcategoryRep.findOneBy({
      name: createSubcategoryDto.name,
    });
    if (isNameExist) {
       // TODO
    }
    const subcategory = this.subcategoryRep.create({
      name: createSubcategoryDto.name,
      topcategory: topcategory,
    });
    await this.subcategoryRep.save(subcategory);
  }

  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryRep.find();
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    const isNameExist = await this.subcategoryRep.findOneBy({
      name: updateSubcategoryDto.name,
    });
    if (isNameExist) {
       // TODO
    }
    await this.subcategoryRep.update(id, { name: updateSubcategoryDto.name });
  }

  async remove(subcategoryId: number) {
    const subcategory = await this.subcategoryRep.findOneBy({
      id: subcategoryId,
    });
    if (!subcategory) {
       // TODO
    }
    await this.subcategoryRep.remove(subcategory);
  }

  async getTopcategorySubcategories(
    topcategoryId: number,
  ): Promise<Subcategory[]> {
    return await this.subcategoryRep.findBy({ topcategoryId: topcategoryId });
  }
}
