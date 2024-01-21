import { UserInterface } from "src/interfaces/Interfaces";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, MissingPrimaryColumnError, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User implements UserInterface {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}