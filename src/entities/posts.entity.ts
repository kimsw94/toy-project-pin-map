import {
  OneToOne,
  JoinColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupsEntity } from './groups.entity';

@Entity({
  name: 'posts',
})
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  imgSrc: string;

//   @OneToOne(() => GroupsEntity)
//   @JoinColumn({ name: 'groups_id' })
//   groups_id: GroupsEntity;

  @Column({ type: 'varchar' })
  latitude: number;

  @Column({ type: 'varchar' })
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
