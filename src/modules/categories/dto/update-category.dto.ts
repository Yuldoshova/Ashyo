import { ApiSchema, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto.ts';

@ApiSchema({ name: 'UpdateCategoryRequest' })
export class UpdateCategory extends PartialType(CreateCategoryDto) {}
