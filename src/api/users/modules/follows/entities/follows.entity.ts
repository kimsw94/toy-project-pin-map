import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'follows',
})

export class FollowsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'number' })
  applyUserId: number

  @Column({ type: 'varchar' })
  acceptedUserId: number

  @Column({ type: 'varchar' })
  status: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}