import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
//   @OneToOne()
  groupsInfo_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_date: Date;
}