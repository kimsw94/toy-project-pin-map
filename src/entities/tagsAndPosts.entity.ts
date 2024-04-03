import { OneToOne, JoinColumn, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { TagsEntity } from './tags.entity'
import { PostsEntity } from './posts.entity'

@Entity({
  name: 'tags_posts',
})

export class TagsAndPostsEntity {
  @PrimaryGeneratedColumn()
  id: number

//   @Column({ type: 'number' })
//   @OneToOne(() => TagsEntity)
//   @JoinColumn({ name: 'tags_id' })
//   tags_id: number

  @Column({ type: 'number' })
  @OneToOne(() => PostsEntity)
  @JoinColumn({ name: 'posts_id' })
  posts_id: number

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}