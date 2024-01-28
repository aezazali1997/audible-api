import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    await this.userService.create({ ...userDto, password: hashedPassword });
  }

  async login(userDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(userDto.email);

    if (!user || !(await bcrypt.compare(userDto.password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
  async validateToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}