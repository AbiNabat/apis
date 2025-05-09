import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '@app/article/article.entity';

@Entity({ name: 'users' })
export class userEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  image: string;

  @Column({select: false})
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ArticleEntity, article => article.author)
  articles: ArticleEntity[];

}