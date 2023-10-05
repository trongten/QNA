import { Module } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { questionProviders } from "./providers/question.providers";
import { DatabaseModule } from "../database/database.module";
import { UsersModule } from "../users/users.module";
import { CaslModule } from "../casl/casl.module";
import { VoteModule } from "../vote/vote.module";

@Module({
  imports: [DatabaseModule, UsersModule, VoteModule, CaslModule],
  controllers: [QuestionController],
  providers: [...questionProviders, QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
