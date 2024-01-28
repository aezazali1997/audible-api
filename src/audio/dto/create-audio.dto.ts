import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsUrl,
  IsNumber,
} from "class-validator";

export class CreateAudioDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  playedTill: number;

  @IsArray()
  downloadablePaths: string[];

  @IsUrl()
  url: string;
}
