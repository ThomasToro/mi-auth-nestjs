import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument, CategorySchema } from './schema/category.schema';
import { Model } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Category as SchemaCategory} from './schema/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { AbilitiesModule } from '../abilities/abilities.module'; //AbilitiesModule
import { log } from 'console';
@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel(SchemaCategory.name) private categoryModel: Model<CategoryDocument>,
        
    ){}
    
    async createCategory(createCategoryDto: CreateCategoryDto, UserId:string): Promise<Category> {

        const foundCategory = await this.categoryModel.findOne({name:createCategoryDto.name});
        if (foundCategory) {
            throw new Error('Category already exists, you can not create a new one');
        }
        const newCategory = new this.categoryModel({...createCategoryDto,createdBy: UserId,});
        return newCategory.save(); //le ponemos el await?
        
    }
    /*
    async create(createProductDto: CreateProductDto, userId: string): Promise<Product> {
        const newProduct = new this.productModel({
        ...createProductDto,
        createdBy: userId,
        });
        return newProduct.save();
    }
    */

    async getAllCategories(){
        const categories = await this.categoryModel.find().exec();
        return categories;
    }

    async getCategoriesByName(name: string){
        const category = await this.categoryModel.findOne({name}).exec();
        console.log(category);
        log('Category:', category);
        
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    async getCategoriesById(id: string) {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto):Promise<Category> {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new Error('Category not found');
        }
        this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
        await category.save();
        return category;
    }

 /*
    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Product> {
        const updatedProduct = await this.productModel
          .findByIdAndUpdate(id, updateProductDto, { new: true })
          .exec();
        if (!updatedProduct) {
          throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return updatedProduct;
      }
*/
    async delete(id: string): Promise<boolean> {
        const result = await this.categoryModel.findByIdAndDelete(id).exec();
        console.log(result);
        log('Category deleted:', result);
        
        if (!result) {
          throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return true;
      }



}