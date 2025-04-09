import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Mongoose, Schema as MongooseSchema } from "mongoose";

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true})
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true })
  path: string;  //para guardar la imagen debemos usar lo que la profe nos compartió al correo

  //le ponemos el created by?
  @Prop({type:MongooseSchema.Types.ObjectId, ref: 'User'})
  createdBy: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);