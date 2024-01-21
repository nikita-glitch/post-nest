import { PartialType } from '@nestjs/mapped-types';
import { CreateTopcategoryDto } from './create-topcategory.dto';

export class UpdateTopcategoryDto extends PartialType(CreateTopcategoryDto) {}
