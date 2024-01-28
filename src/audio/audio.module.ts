import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from "@nestjs/common";
import { AudioService } from "./audio.service";
import { AudioController } from "./audio.controller";
import { Audio, AudioSchema } from "./audio.model";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "src/user/auth.service";
import { UserService } from "src/user/user.service";
import { JwtModule } from '@nestjs/jwt'; 
import { User, UserSchema } from "src/user/user.model";
import { AuthMiddleware } from "src/middlewares/auth-middleware";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Audio.name,
        schema: AudioSchema,
      },
      {
        name:User.name,
        schema:UserSchema
      }
    ]),
     JwtModule.register({
      secret: 'secret-101', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AudioController],
  providers: [AudioService,AuthService,UserService],
})
export class AudioModule implements NestModule {
  configure(consumer:MiddlewareConsumer){
        consumer.apply(AuthMiddleware).forRoutes(AudioController);

  }
}
