import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  //   @OneToOne()
  groupInfoId: number;

  @Column()
  //   @OneToOne()
  groupInfoName: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_date: Date;
}
