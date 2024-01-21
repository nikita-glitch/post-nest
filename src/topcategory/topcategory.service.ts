import { Injectable } from '@nestjs/common';
import { CreateTopcategoryDto } from './dto/create-topcategory.dto';
import { UpdateTopcategoryDto } from './dto/update-topcategory.dto';

@Injectable()
export class TopcategoryService {
  create(createTopcategoryDto: CreateTopcategoryDto) {
    return 'This action adds a new topcategory';
  }

  findAll() {
    return `This action returns all topcategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topcategory`;
  }

  update(id: number, updateTopcategoryDto: UpdateTopcategoryDto) {
    return `This action updates a #${id} topcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} topcategory`;
  }
}
