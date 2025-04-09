import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose, Schema as MongooseSchema } from "mongoose";

export type ProductDocument = Product & Document;

@Schema({timestamps: true})
export class Product {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    price: number;

    @Prop({default: true})
    isActive: boolean;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Category'})
    category: string;  //agregamos el id de la categoria al schema 

    @Prop({type:MongooseSchema.Types.ObjectId, ref: 'User'})
    createdBy: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);