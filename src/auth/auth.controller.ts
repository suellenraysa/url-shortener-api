import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginSwagger } from './swagger/login.swagger';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Autenticar um usuário' })
  @ApiBody({ 
    description: 'Credenciais de login', 
    type: LoginSwagger // Supondo que você tenha um DTO para o login
  }) 
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas ou não autenticado',
  })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}