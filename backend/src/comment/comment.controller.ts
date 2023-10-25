import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AnswerService } from "../answer/answer.service";
import { CaslAbilityFactory } from "../casl/casl-ability.factory";
import { CommentService } from "./comment.service";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AccessTokenGuard } from "../auth/guards/accessToken.guard";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Action } from "../enums/action.enum";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller("comment")
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly answerService: AnswerService,
  ) {}

  /**
   * Get paginated answers based on the provided answerId.
   *
   * @param answerId - The ID of the question to filter comment.
   * @param page - The page number for pagination.
   * @param limit - The limit of items per page for pagination.
   * @returns Paginated list of comment.
   */
  @ApiOperation({
    summary: "get paginate comment",
  })
  @Get()
  @UseGuards()
  find(
    @Query("answer_id") answerId: string,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.commentService.find(answerId, {
      page,
      limit,
    });
  }

  /**
   * Get a specific comment by its ID.
   *
   * @param id - The ID of the comment to retrieve.
   * @returns The comment with the specified ID.
   */
  @ApiOperation({
    summary: "get comment",
  })
  @Get(":id")
  @UseGuards()
  async findOneById(@Param("id") id: string) {
    return this.commentService.findOneById(id);
  }

  /**
   * Create a new comment for a answer.
   *
   * @param answerDto - The data to create a new comment.
   * @param req - The request object.
   * @returns The created comment.
   */
  @ApiOperation({
    summary: "create answer",
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AccessTokenGuard)
  async create(@Body() answerDto: CreateCommentDto, @Req() req: Request) {
    const userId = req["user"]["sub"];
    const answer = await this.answerService.findOneById(answerDto.answer_id);
    if (answer) {
      return this.commentService.create(answerDto, userId);
    }
  }

  /**
   * Update an existing answer.
   *
   * @param id - The ID of the answer to update.
   * @param commentDto - The updated data for the comment.
   * @param req - The request object.
   * @returns The updated answer.
   */
  @ApiOperation({
    summary: "update answer",
  })
  @ApiBearerAuth()
  @Patch(":id")
  @UseGuards(AccessTokenGuard)
  async update(
    @Param("id") id: string,
    @Body() commentDto: UpdateCommentDto,
    @Req() req: Request,
  ) {
    const ability = this.caslAbilityFactory.createForUser(req["user"]);
    const comment = await this.commentService.findOneById(id);

    if (!comment) {
      throw new NotFoundException(`There is no comment under id ${id}`);
    }

    if (ability.can(Action.Update, comment)) {
      return this.commentService.update(id, commentDto);
    } else {
      throw new ForbiddenException("Access Denied. Not author");
    }
  }

  /**
   * Delete an comment.
   *
   * @param id - The ID of the answer to delete.
   * @param req - The request object.
   * @returns The deleted comment.
   */
  @ApiOperation({
    summary: "delete comment",
  })
  @ApiBearerAuth()
  @Delete(":id")
  @UseGuards(AccessTokenGuard)
  async remove(@Param("id") id: string, @Req() req: Request) {
    const ability = this.caslAbilityFactory.createForUser(req["user"]);
    const comment = await this.commentService.findOneById(id);

    if (!comment) {
      throw new NotFoundException(`There is no comment under id ${id}`);
    }

    if (ability.can(Action.Delete, comment)) {
      return this.commentService.remove(comment);
    } else {
      throw new ForbiddenException("Access Denied. Not author");
    }
  }
}
