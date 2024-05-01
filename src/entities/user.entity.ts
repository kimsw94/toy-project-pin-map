import { Column, OneToMany, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { DateColumn } from './common.entity'
import { GroupEntity } from './group.entity'
import { UserGroupStatus } from 'src/enums/group.status.enum'

@Entity({
  name: 'user',
  comment: '유저 테이블'
}) 

export class UserEntity extends DateColumn {
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

  /*
  테이블 관계 설정
  */

  // @OneToMany(()=> UserGroupEntity, (userGroup) => userGroup.user)
  // UserGroups: UserGroupEntity[];
}

@Entity({
  name: 'user_group',
  comment: '사용자와 그룹을 연결하는 중간 테이블',
})

export class UserGroupEntity extends DateColumn{
  @PrimaryGeneratedColumn()
  id: number

  /*
  테이블 관계 설정
  */

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity

  @ManyToOne(() => GroupEntity, (group) => group.id)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: GroupEntity

  @Column({ type: 'enum', enum: UserGroupStatus })
  status: UserGroupStatus
}