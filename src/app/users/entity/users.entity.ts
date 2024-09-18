import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, Index, DeleteDateColumn } from "typeorm";
import { hashSync } from 'bcrypt';
import { AuthGuard } from "@nestjs/passport";
import { UseGuards } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'users'})
@UseGuards(AuthGuard('jwt'))
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
      description: 'ID do usuário (gerado automaticamente)',
      example: 'b3d7643b-3424-4c7c-b67f-28f58d58b4af',
    })
    id: string;

    @Column({ name: 'first_name' })
    @ApiProperty({
      description: 'Primeiro nome do usuário',
      example: 'Jacó',
    })
    firstName: string;

    @Column({ name: 'last_name' })
    @ApiProperty({
      description: 'Último nome do usuário',
      example: 'Israel',
    })
    lastName: string;

    @Column()
    @Index({ unique: true })
    @ApiProperty({
      description: 'Email do usuário (deve ser único)',
      example: 'jaco.israel@email.com',
      uniqueItems: true,
    })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    hashPassword() {
      this.password = hashSync(this.password, 10);
    }

    @DeleteDateColumn({name: 'deleted_at'})
    @ApiProperty({
      description: 'Data de exclusão (soft delete)',
      example: '2024-08-12T19:00:00Z',
      required: false,
    })
    deletedAt: string;
}