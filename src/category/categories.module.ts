import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { AbilitiesModule } from 'src/abilities/abilities.module';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports:[
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
        AbilitiesModule, //

  ],
})
export class CategoriesModule{}