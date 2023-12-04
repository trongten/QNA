import { User } from "../../users/entity/users.entity";
import { Answer } from "../../answer/entity/answer.entity";
import { Vote } from "../../vote/entity/vote.entity";
import { Tag } from "../../tag/entity/tag.entity";
import { QuestionTypeEnum } from "../../enums/question-type.enum";
import { Activity } from "../../activity/entity/activity.entity";
import { QuestionState } from "../../enums/question-state.enum";
import { Comment } from "../../comment/entity/comment.entity";
import { Bookmark } from "../../bookmark/entity/bookmark.entity";
import { History } from "../../history/entity/history.entity";
export declare class Question {
    id: string;
    title: string;
    content: string;
    views: number;
    votes: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    state: QuestionState;
    user: User;
    answers: Answer[];
    comments: Comment[];
    vote: Vote[];
    tags: Tag[];
    activity: Activity[];
    bookmarks: Bookmark[];
    histories: History[];
    answersNumber: number;
    type: QuestionTypeEnum;
    tagNames: string[];
}
