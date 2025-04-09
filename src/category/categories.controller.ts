import { Body, Controller, ForbiddenException, Get, Param, Post, Put, UploadedFile, UseInterceptors, Request, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Public } from 'src/users/decorators/public.decorator';
import { CategoriesService } from './categories.service';
import { CheckPolicies } from 'src/users/decorators/check-policies.decorator';
import { AbilityFactory, Action } from '../abilities/ability.factory';
import { Category } from './schema/category.schema';

@Controller('category')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private abilityFactory: AbilityFactory,


    ) {}

    //create con los permisos adecuados hecho
    @CheckPolicies({ action: Action.Create, subject: 'Category' }) // CheckPolicies
    @Post('create')
    @UseInterceptors(FileInterceptor('file', ))
    createCategory(@Body() createCategoryDto:CreateCategoryDto ,@UploadedFile() file: Express.Multer.File,@Request() req) {
        createCategoryDto.path = file.path;

        return this.categoriesService.createCategory(createCategoryDto,req.user.id); 
        
    }

    @Get('getAll')
    @Public()
    getAllCategories() {
        return this.categoriesService.getAllCategories();
    }

    @Get('getByName/:name')
    @Public()
    getCategoryByName(@Param('name') name: string) {
        return this.categoriesService.getCategoriesByName(name);
    }

    @CheckPolicies({ action: Action.Update, subject: 'Category', checkData: true })
    
    @Put('update/:id')
    //update hecho
    async updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,@Request() req) {

        const category = await this.categoriesService.getCategoriesById(id);
        const ability = this.abilityFactory.defineAbilitiesFor(req.user);
        
        // Manual check for entity-specific permissions
        if (!this.abilityFactory.can(ability, Action.Update, 'Category',category)) {
        throw new ForbiddenException('You can only update your own categories');
        }
        return this.categoriesService.updateCategory(id, updateCategoryDto);
    }

    //DEBO HACER EL DELETE, PONERLE EL CHECKPOLICIES Y HACER EL DELETE EN EL SERVICE
        
    @CheckPolicies({ action: Action.Delete, subject: 'Category', checkData: true })
      @Delete('delete/:id')
      async delete(@Param('id') id: string, @Request() req) {
        const category = await this.categoriesService.getCategoriesById(id);
        const ability = this.abilityFactory.defineAbilitiesFor(req.user);
        
        // Manual check for entity-specific permissions
        if (!this.abilityFactory.can(ability, Action.Delete, 'Category', category)) {
          throw new ForbiddenException('You can only delete your own products');
        }
        
        return this.categoriesService.delete(id);
      }
        
    
}