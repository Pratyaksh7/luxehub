import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthServiceService } from "../auth.service";
import { LoginUserDto } from "../dto/login.user.dto";

@Injectable()
export class LoginAuthGuard implements CanActivate{
    constructor(private readonly authService: AuthServiceService) { }

    async canActivate(context: ExecutionContext):  Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const {email, password} = request.body;
        if(!email || !password){
            return false
        }
        var loginDto:LoginUserDto = {
            email: email,
            password: password
        }
        const user = await this.authService.validateUser(loginDto);
        if(!user){
            return false
        }
        request.user = user;
        return true;
    }
}