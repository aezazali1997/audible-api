import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body(ValidationPipe) userDto: CreateUserDto): Promise<void> {
    await this.authService.register(userDto);
  }

  @Post("login")
  async login(
    @Body(ValidationPipe) loginData: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginData);
  }
}
