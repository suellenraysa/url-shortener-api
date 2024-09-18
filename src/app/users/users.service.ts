import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UsersEntity } from './entity/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOneOrFail(
    options: FindOneOptions<UsersEntity>
  ) {
    try {
      return await this.usersRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateUsersDto) {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(id: string, data: UpdateUsersDto) {
    const user = await this.findOneOrFail({ where: { id } });
    this.usersRepository.merge(user, {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });
    return this.usersRepository.save(user);
  }   

  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.softDelete({ id });
  }
}