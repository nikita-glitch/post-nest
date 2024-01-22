import { SubcategoryInterface } from 'src/interfaces/Interfaces';
import { Post } from 'src/post/entities/post.entity';
import { Topcategory } from 'src/topcategory/entities/topcategory.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subcategory implements SubcategoryInterface {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  topcategoryId: number;

  @OneToMany(() => Post, (post) => post.subcategory)
  posts: Post[];

  @ManyToOne(() => Topcategory, (topcategory) => topcategory.subcategories)
  topcategory: Topcategory;
}
