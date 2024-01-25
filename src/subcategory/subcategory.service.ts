import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';
import { Topcategory } from 'src/topcategory/entities/topcategory.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRep: Repository<Subcategory>,
    @InjectRepository(Topcategory)
    private topcategoryRep: Repository<Topcategory>,
    @InjectRepository(Post)
    private postRep: Repository<Post>,

  ) {}

  async create(
    createSubcategoryDto: CreateSubcategoryDto,
  ) {
    const { name, topcategoryName } = createSubcategoryDto;
    const topcategory = await this.topcategoryRep.findOneBy({
      name: topcategoryName,
    });    
    if (!topcategory) {
      throw new HttpException('Topcategory not found', HttpStatus.NOT_FOUND)
    }
    const isNameExist = await this.subcategoryRep.findOneBy({
      name: name,
    });
    if (isNameExist) {
      throw new HttpException('Subcategory with this name already exists', HttpStatus.BAD_REQUEST)
    }
    const subcategory = this.subcategoryRep.create({
      name: name,
      topcategory: topcategory,
    });
    await this.subcategoryRep.save(subcategory);
  }

  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryRep.find();
  }
  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    const name = updateSubcategoryDto.name
    const isNameExist = await this.subcategoryRep.findOneBy({
      name: name,
    });
    if (isNameExist) {
      throw new HttpException('Subcategory with this name already exists', HttpStatus.BAD_REQUEST)
    }
    await this.subcategoryRep.update(id, { name: name });
  }

  async remove(subcategoryId: number) {
    const subcategory = await this.subcategoryRep.findOneBy({
      id: subcategoryId,
    });
    if (!subcategory) {
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND)
    }
    await this.subcategoryRep.remove(subcategory);
  }

  async getSubcategoryPosts(subcategoryId: number): Promise<Post[]> {
    const subcategory = this.subcategoryRep.findOneBy({ id: subcategoryId });
    if (!subcategory) {
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    }
    return this.postRep.findBy({ subcategoryId: subcategoryId });
  }
}
