import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator'

export class UserAuthDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
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