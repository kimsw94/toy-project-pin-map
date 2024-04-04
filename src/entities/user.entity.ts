import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { DateColumn } from './commons/date.entity'

@Entity({
  name: 'user',
  comment: '유저 테이블'
}) //복수형보다는 단수형으로 하는 것이 좋다. (DB Convention 관련함)

export class UsersEntity extends DateColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar' })
  nickname: string

  @Column({ type: 'varchar' })
  phone: string
}

@Entity({
  name: 'user_group',
  comment: '사용자와 그룹을 연결하는 중간 테이블',
})

export class UserGroupEntity extends DateColumn{
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  users_id: number

  @Column({ type: 'integer' })
  groups_id: number

  @Column({ type: 'enum' })
  status: string
}

@Entity({
  name: 'user_group_status',
  comment: '사용자와 그룹 신청 상태를 관리하는 중간 테이블',
})

export class UserGroupStatusEntity extends DateColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'integer' })
  users_id: number

  @Column({ type: 'integer' })
  groups_id: number

  @Column({ type: 'enum' })
  status: string
}