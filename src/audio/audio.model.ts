import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Audio extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  playedTill: number;

  @Prop({ required: true, type: [String] })
  downloadablePaths: string[];

  @Prop({ required: true })
  url: string;
}

export const AudioSchema = SchemaFactory.createForClass(Audio);
