import { Category } from 'src/modules/categories/entities/category.entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false, unique: true })
  name: string;

  @Column({ name: 'image', type: 'varchar', nullable: false })
  image: string;

  @OneToMany(() => Category, (category) => category.brand)
  categories: Array<Category>
}
