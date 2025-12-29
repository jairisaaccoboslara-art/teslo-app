import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}


  async create( createUserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        user: user,
        token: this.getJwtToken({ id: user.id })
      };
      // TODO: Retornar el JWT de acceso

    } catch (error) {
      this.handleDBErrors(error);
    }
    

  }
  

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, fullName: true, isActive: true, roles: true}
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;

    return {
      user: user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  async checkAuthStatus( user: User ){

    return {
      user: user,
      token: this.getJwtToken({ id: user.id })
    };

  }


  
  public getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }
  async findAllUsers(): Promise<Partial<User>[]> {
  try {
    return this.userRepository.find({
      select: ['id', 'fullName', 'email', 'roles'],
    });
  } catch (error) {
    console.error(error);
    throw new InternalServerErrorException('Error fetching users');
  }
}



// 👇 AGREGA ESTO AQUÍ 👇

async updateUser(id: string, updateUserDto: UpdateUserDto) {
  const user = await this.userRepository.preload({
    id,
    ...updateUserDto
  });

  if (!user) {
    throw new NotFoundException(`User with id "${id}" not found`);
  }

  // Si se envía password, hashearlo
  if (updateUserDto.password) {
    user.password = bcrypt.hashSync(updateUserDto.password, 10);
  }

  return this.userRepository.save(user);
}

async deleteUser(id: string) {
  const user = await this.userRepository.findOneBy({ id });

  if (!user) {
    throw new NotFoundException(`User with id "${id}" not found`);
  }

  return this.userRepository.remove(user);
}


}
  




