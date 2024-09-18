import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsersEntity } from "../../users/entity/users.entity";
import { v4 as uuidv4} from 'uuid';
import { IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'url_shorteners'})
export class UrlShortEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'ID único do encurtador de URL',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;
    
    @ManyToOne(() => UsersEntity)
    @JoinColumn({name: 'user_id'})
    @ApiProperty({
        description: 'ID do usuário relacionado',
        type: () => UsersEntity
    })
    userId: UsersEntity;    
    
    @Column({name: 'url_shortener'})
    @ApiProperty({
        description: 'URL encurtada gerada',
        example: 'http://localhost:3000/abc123'
    })
    urlShortener: string;

    @Column({name: 'url_original', type: 'varchar', length: 2048})
    @ApiProperty({
        description: 'URL original a ser encurtada',
        example: 'https://www.exemplo.com/artigo/como-fazer'
    })
    @IsUrl()
    urlOriginal: string;

    @Column({name: 'access_count', default: 0 })
    @ApiProperty({
        description: 'Número de acessos à URL encurtada',
        example: 5
    })
    accessCount: number;
    
    @Column()
    @ApiProperty({
        description: 'Hash gerada para a URL',
        example: 'abc123'
    })
    hash: string;

    @CreateDateColumn({name: 'created_at'})
    @ApiProperty({
        description: 'Data de criação do encurtador de URL',
        example: '2024-09-16T19:20:30Z'
    })
    createdAt: string;
    
    @UpdateDateColumn({name: 'updated_at'})
    @ApiProperty({
        description: 'Data da última atualização do encurtador de URL',
        example: '2024-09-17T19:20:30Z'
    })
    updatedAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    @ApiProperty({
        description: 'Data de exclusão (soft delete) do encurtador de URL',
        example: '2024-09-18T19:20:30Z',
        required: false
    })
    deletedAt: string;

    constructor(){
        if (!this.id){
            this.id = uuidv4();
        }
        if (!this.urlShortener){
            this.urlShortener = Math.random().toString(36).slice(-8)
        }
    }

}
