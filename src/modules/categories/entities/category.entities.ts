import { Brand } from 'src/modules/brand/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.categories)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  image: string;

  @Column({ name: 'icon', type: 'varchar', nullable: true })
  icon: string;

  @OneToMany(() => Category, (category) => category.parent)
  children: Array<Category>

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
