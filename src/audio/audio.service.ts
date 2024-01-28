import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAudioDto } from "./dto/create-audio.dto";
import { UpdateAudioDto } from "./dto/update-audio.dto";
import { Audio } from "./audio.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { cloudinary } from "../../config/cloudinary.config";

@Injectable()
export class AudioService {
  constructor(@InjectModel(Audio.name) private audioModel: Model<Audio>) {
    cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});
  }

  create(createAudioDto: CreateAudioDto) {
    const createdAudio = new this.audioModel({
      name: createAudioDto.name,
      playedTill: createAudioDto.playedTill,
      downloadablePaths: createAudioDto.downloadablePaths,
      url: createAudioDto.url,
    });
    return createdAudio.save();
  }

  async findAll(): Promise<Audio[]> {
    return this.audioModel.find().exec();
  }

  async findOne(id: string): Promise<Audio | null> {
    const audio = await this.audioModel.findById(id).exec();
    if (!audio) {
      throw new NotFoundException(`Audio with ID ${id} not found`);
    }
    return audio;
  }

  async update(
    id: string,
    updateAudioDto: UpdateAudioDto,
  ): Promise<Audio | null> {
    const updatedAudio = await this.audioModel.findByIdAndUpdate({_id:id},{...updateAudioDto},{new:true})

    if (!updatedAudio) {
      throw new NotFoundException(`Audio with ID ${id} not found`);
    }

    return updatedAudio;
  }

  async remove(id: string): Promise<Audio | null> {
    const removedAudio = await this.audioModel.findByIdAndDelete(id).exec();

    if (!removedAudio) {
      throw new NotFoundException(`Audio with ID ${id} not found`);
    }

    return removedAudio;
  }
  uploadToCloudinary(filePath: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        filePath,
        { folder: "Audible", resource_type: "video" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
    });
  }
}
