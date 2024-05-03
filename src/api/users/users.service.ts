import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { UsersRepository } from '../../repositories/users.repository'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { AuthDTO } from './dtos/auth.dto'
import { UsersDTO } from './dtos/users.dto'
import { UserEntity } from 'src/entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}
  async signUp(dto: AuthDTO.signUp): Promise<string> {
    const getUserIdByEmail =
      await this.usersRepository.getUserIdByEmail(dto.email)

    if (getUserIdByEmail)
      throw new InternalServerErrorException(
        '이메일이 중복되었습니다.',
      )

    await this.usersRepository.signUp(dto)
    const userInfo = await this.usersRepository.getUserIdByEmail(
      dto.email,
    )

    const jwt = await this.jwtService.signAsync({ payload: userInfo.id })
    return jwt
  }

  async signIn(email: string, password: string) {
    const isExist = await this.usersRepository.getUserIdByEmail(email)

    if (!isExist)
      throw new InternalServerErrorException(
        '이메일이 존재하지 않습니다.',
      )

    const isPassword =
      await this.usersRepository.getHashedPassword(email)
    if (!isPassword)
      throw new BadRequestException('올바른 패스워드를 입력해주세요')

    const isMatched = await bcrypt.compare(password, isPassword)
    if (!isMatched)
      throw new InternalServerErrorException('패스워드가 틀렸습니다.')

    const user = await this.usersRepository.getUserIdByEmail(email)
    const jwt = this.jwtService.signAsync({
      id: user.id,
    })
    return jwt
  }

  async findUserByEmail(email: string) {
    try {
      const userId =
        await this.usersRepository.getUserIdByEmail(email)
      if (!userId) throw new BadRequestException('유저가 없습니다.')
      return userId
    } catch (error) {
      throw new BadRequestException('잘못된 요청입니다')
    }
  }

  async getUserInfo(userId: string): Promise<UserEntity> {
    const info = await this.usersRepository.getUserInfo(userId)
    if (!info) throw new BadRequestException('유저가 없습니다.')
    return info
  }

  async withdrawUser(dto: UsersDTO.update): Promise<string> {
    const userId = await this.usersRepository.getUserIdByEmail(
      dto.email,
    )
    if (!userId) throw new BadRequestException('유저가 없습니다.')
    const withdrawUser =
      await this.usersRepository.withdrawUser(userId)
    return withdrawUser
  }

  // async updateUser(dto: UsersDTO.update): Promise<string> {
  //   try {
  //     const userId = await this.usersRepository.getUserIdByEmail(
  //       dto.email,
  //     )
  //     if (!userId) throw new BadRequestException('유저가 없습니다.')

  //     const updateUser = await this.usersRepository.updateUser(
  //       userId,
  //       dto,
  //     )
  //     return updateUser
  //   } catch (error) {
  //     throw new BadRequestException('잘못된 요청입니다.')
  //   }
  // }
}
