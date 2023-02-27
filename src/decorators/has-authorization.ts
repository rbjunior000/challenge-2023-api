import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';

interface IRequest extends Request {
  userId?: number;
  userToken?: string;
}

@Injectable()
export class HasAuthorization implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return this.execute(req);
  }

  private async execute(req: IRequest): Promise<boolean> {
    const token =
      req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token has expired');
    }

    const { bToken, userId } = this.auth.decode(token);

    if (!userId) {
      throw new UnauthorizedException('Token parse error');
    }

    req.userId = Number(userId);
    req.userToken = bToken;

    return true;
  }
}
