import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/app/users/users.module';
import { AnonymousAuthGuard } from './strategies/anonymous.guard';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        PassportModule,
        JwtModule.register({
            privateKey: process.env.JWT_SECRET_KEY,
            // signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, AnonymousAuthGuard],
})

export class AuthModule {}