import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extractRolesObj } from 'clairview-sdk';
import type { AppConfig } from '~/interface/config';
import { AuthService } from '~/modules/auth/auth.service';
import { CvError } from '~/helpers/catchError';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private config: ConfigService<AppConfig>,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    if (this.config.get('auth.disableEmailAuth', { infer: true }))
      CvError.forbidden('Not available');

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      CvError.badRequest('Invalid credentials');
    }

    user.roles = extractRolesObj(user.roles);

    return user;
  }
}
