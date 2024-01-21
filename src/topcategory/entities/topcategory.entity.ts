import { TopcategoryInterface } from "src/interfaces/Interfaces";
import { Subcategory } from "src/subcategory/entities/subcategory.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Topcategory implements TopcategoryInterface {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.topcategory)
  subcategories: Subcategory[]
}