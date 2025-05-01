import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthServiceService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { ExistAuthGuard } from './guards/exist-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthServiceController {
    constructor(private readonly authservice: AuthServiceService){}

    @Post('signup')
    @UseGuards(ExistAuthGuard)
    signup(@Body() body:CreateUserDto) {
        return this.authservice.signup(body)
    }

    @Post('signin')
    @UseGuards(LoginAuthGuard)
    signin(@Req() request ) {
        const user = request.user;
        return this.authservice.signin(user);

    }

    @Get('name')
    @UseGuards(JwtAuthGuard)
    getName(@Request() req) {
        return this.authservice.getName(req.user);
    }
}
