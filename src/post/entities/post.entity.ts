import { PostInterface } from 'src/interfaces/Interfaces';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post implements PostInterface {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  postText: string;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  subcategoryId: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.posts)
  subcategory: Subcategory;
}
