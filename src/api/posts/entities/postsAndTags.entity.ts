import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class PostsAndTagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tags_id: number;

  @Column()
//   @OneToMany()
  posts_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_date: Date;
}