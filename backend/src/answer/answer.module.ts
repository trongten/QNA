import { Module } from "@nestjs/common";
import { AnswerController } from "./answer.controller";
import { AnswerService } from "./answer.service";
import { DatabaseModule } from "../database/database.module";
import { answerProviders } from "./providers/answer.providers";
import { QuestionModule } from "../question/question.module";
import { CaslModule } from "../casl/casl.module";
import { VoteModule } from "../vote/vote.module";

@Module({
  imports: [DatabaseModule, QuestionModule, VoteModule, CaslModule],
  controllers: [AnswerController],
  providers: [...answerProviders, AnswerService],
})
export class AnswerModule {}
