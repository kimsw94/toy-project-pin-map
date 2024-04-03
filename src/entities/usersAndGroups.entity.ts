import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'users',
})

export class UsersAndGroupsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  users_id: number

  @Column({ type: 'integer' })
  groups_id: number

  @Column({ type: 'varchar' })
  status: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}