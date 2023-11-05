import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
} from "typeorm";
import { User } from "../../users/entity/users.entity";
import { Question } from "../../question/entity/question.entity";
import { Vote } from "../../vote/entity/vote.entity";
import { Comment } from "../../comment/entity/comment.entity";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  content: string;

  @Column({ default: 0 })
  votes: number;

  @Column({ name: "is_approved", default: false })
  isApproved: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // Relations

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "question_id" })
  question: Question;

  @ManyToOne(() => User, (user) => user.answers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Vote, (vote) => vote.answer)
  vote: Vote[];

  @OneToMany(() => Comment, (comment) => comment.answer)
  comments: Comment[];

  //Virtual Columns

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT(*) FROM comment WHERE comment.answer_id = ${alias}.id`,
  })
  commentsNumber: number;
}
