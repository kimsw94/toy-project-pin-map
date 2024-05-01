import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateColumn } from './common.entity';
import { UserGroupEntity } from './user.entity';

@Entity({
  name: 'group',
})
export class GroupEntity extends DateColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  /*
  테이블 관계 설정
  */

  // @OneToMany(()=> UserGroupEntity, (UserGroup) => UserGroup.group)
  // UserGroups: UserGroupEntity[];
}
