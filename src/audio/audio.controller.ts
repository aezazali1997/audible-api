import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { AudioService } from "./audio.service";
import { CreateAudioDto } from "./dto/create-audio.dto";
import { UpdateAudioDto } from "./dto/update-audio.dto";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthMiddleware } from "src/middlewares/auth-middleware";

@Controller("audio")
@UseGuards(AuthMiddleware)
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("audio", {
      storage: diskStorage({
        destination: "./tmp",
      }),
    }),
  )
  async uploadAudio(
    @UploadedFile() audioFile,
    @Body() createAudioDto: CreateAudioDto,
  ) {
    const cloudinaryResponse: any = await this.audioService.uploadToCloudinary(
      audioFile.path,
    );
    createAudioDto.url = cloudinaryResponse.url;
    return this.audioService.create(createAudioDto);
  }

  @Get()
  findAll() {
    return this.audioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.audioService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAudioDto: UpdateAudioDto) {
    return this.audioService.update(id, updateAudioDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.audioService.remove(id);
  }
}
