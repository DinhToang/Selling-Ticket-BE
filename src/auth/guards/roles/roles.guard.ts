import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';
import { ROLES_KEY } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { authConstants } from '../jwt/auth.constants';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    
    const token = authHeader.split(' ')[1];

    const jwtSecret = authConstants.secret      
    const payload = jwt.verify(token, jwtSecret) as any;

    console.log(payload);

    const requiredRole = requiredRoles.some((role) => payload.role == role);
    return requiredRole;
  }
}
