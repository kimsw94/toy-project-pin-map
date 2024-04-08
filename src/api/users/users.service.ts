import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { UsersRepository } from '../../repositories/users.repository'
import { UserEntity } from 'src/entities/user.entity'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { DataSource, Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { UserAuthDTO } from './dtos/auth.dto'

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private datasource: DataSource,
  ) {}
  async signUp(dto: UserAuthDTO): Promise<string> {
    const isExist = await this.usersRepository.getUserIdByEmail(dto)
    if (isExist)
      throw new InternalServerErrorException(
        '이메일이 중복되었습니다.',
      )
    await this.usersRepository.signUp(dto)

    const user = await this.usersRepository.getUserIdByEmail(dto)

    const jwt = await this.jwtService.signAsync({
      id: user.id,
    })

    return jwt
  }

  async signIn(dto: UserAuthDTO) {
    const email = dto.email
    const isExist = await this.usersRepository.getUserIdByEmail(dto)
    if (!isExist)
      throw new InternalServerErrorException(
        '이메일이 존재하지 않습니다.',
      )

    const isPassword =
      await this.usersRepository.getHashedPassword(dto)
    if (!isPassword)
      throw new BadRequestException('올바른 패스워드를 입력해주세요')

    const isMatched = await bcrypt.compare(dto.password, isPassword)
    if (!isMatched)
      throw new InternalServerErrorException('패스워드가 틀렸습니다.')

    const user = await this.usersRepository.getUserInfoByEmail(dto)
    const jwt = await this.jwtService.signAsync({
      id: user.id,
    })

    return jwt
  }

  async findUserByEmail(dto: UserAuthDTO) {
    try {
      const isExist = await this.usersRepository.getUserIdByEmail(dto)
      if (!isExist) throw new BadRequestException('유저가 없습니다.')
      return isExist
    } catch (error) {
      throw new BadRequestException('잘못된 요청입니다')
    }
  }

  async withdraw(userId: number) {
    const userWithdraw = await this.usersRepository.banUser(userId)
    return { userWithdraw }
  }
}
