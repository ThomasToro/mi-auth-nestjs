
export class CreateCategoryDto {
  name: string;
  description: string;
  isActive?: boolean;
  path?: string;
}

export class UpdateCategoryDto {
  name?: string;
  description?: string;
  isActive?: boolean;
  path?: string;
}