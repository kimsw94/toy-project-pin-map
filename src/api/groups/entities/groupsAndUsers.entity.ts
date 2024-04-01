import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  //   @OneToOne()
  groups_id: number;

  @Column()
  //   @OneToOne()
  users_id: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_date: Date;
}