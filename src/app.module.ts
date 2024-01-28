import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AudioModule } from "./audio/audio.module";
import { SyncService } from "./sync/sync.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user/user.service";
import { AuthService } from "./user/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { User, UserSchema } from "./user/user.model";
import { UserController } from "./user/user.controller";
import { AudioSchema, Audio } from "./audio/audio.model";
import { AudioController } from "./audio/audio.controller";
import { AudioService } from "./audio/audio.service";

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://audibleapp:audioapp@cluster0.yr18f7q.mongodb.net/`,
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Audio.name,
        schema: AudioSchema,
      },
    ]),
    JwtModule.register({
      secret: "secret-101",
      signOptions: { expiresIn: "1h" },
    }),
    AudioModule,
    UserModule
  ],
  controllers: [AppController, UserController,AudioController],
  providers: [AppService, UserService, SyncService, AuthService,AudioService],
})
export class AppModule {}
