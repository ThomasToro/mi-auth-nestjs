import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 'editor' })
  role: string;

  @Prop({ type: String, required: false })
  refreshToken?: string;

  @Prop({ type: String, required: false })
  verificationCode?: string;

  @Prop({ type: Date, required: false })
  verificationCodeExpires?: Date;


  //match: /^\+\d{1,3}\d{7,}$/
  @Prop({ type: String, required: true, unique: true}) //ponemos para que coincida con el formato adecuado
  phoneNumber: string;

  @Prop({type:String,required:false})
  smsCode?:string;

  @Prop({ type: Date, required: false })
  smsCodeExpires?:Date;
}

export const UserSchema = SchemaFactory.createForClass(User);