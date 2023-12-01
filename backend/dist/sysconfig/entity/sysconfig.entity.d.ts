import { User } from "../../users/entity/users.entity";
export declare class Sysconfig {
    id: string;
    createQuestion: number;
    updateQuestion: number;
    createAnswer: number;
    updateAnswer: number;
    createComment: number;
    updateComment: number;
    upVote: number;
    cancleUpVote: number;
    changeDownVoteToUpVote: number;
    acceptAnswer: number;
    deleteQuestion: number;
    deleteAnswer: number;
    deleteComment: number;
    downVote: number;
    cancleDownVote: number;
    changeUpVoteToDownVote: number;
    unAcceptAnswer: number;
    blockQuestion: number;
    unBlockQuestion: number;
    verifyQuestion: number;
    verifyTag: number;
    createQuestionDaily: number;
    questionCreatePointCheck: number;
    isUse: boolean;
    createdAt: Date;
    updatedAt: Date;
    latestEditUser: User;
}