import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsPhoneNumber,
  IsString,
  IsJWT,
} from 'class-validator'
import { ApiProperty, PickType } from '@nestjs/swagger'

export namespace UsersDTO {
  export class update {
    email: string
    nickname: string
    phone: string
  }

  export class withdraw {
    @ApiProperty({
      example: '1234@gmail.com',
      description: '이메일',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string
  }

  export class updatePassword {
    @ApiProperty({
      example: '@Aa123456789',
      description: '비밀번호',
    })
    @IsStrongPassword(
      {
        minLength: 10,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      },
      {
        message:
          '비밀번호는 최소한 1개 이상의 숫자와 대문자, 특수문자가 모두 포함되고 10자리 이상이어야 합니다.',
      },
    )
    password: string
  }

  export class response {
    @IsString()
    @IsJWT()
    token: string

    constructor(token: string) {
      this.token = token
    }
  }

  export class UserResponse {
    userId: string
    username: string

    constructor(userId: string, username: string) {
      this.userId = userId
      this.username = username
    }
  }
}
