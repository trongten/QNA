import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { NotificationService } from "./notification.service";
import { AccessTokenGuard } from "../auth/guards/accessToken.guard";
import { message } from "../constants/message.constants";
import { NotificationDto } from "./dto/notification.dto";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Role } from "../enums/role.enum";
import { Roles } from "../auth/decorator/roles.decorator";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { PaginateQuery } from "nestjs-paginate/lib/decorator";
import { ApiOkPaginatedResponse, ApiPaginationQuery } from "nestjs-paginate";
import { notificationPagination } from "../config/pagination/notification-pagination";
import { Notification } from "./entity/notification.entity";

@Controller("notification")
@ApiTags("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOkPaginatedResponse(Notification, notificationPagination)
  @ApiPaginationQuery(notificationPagination)
  @ApiOperation({
    summary: "get notification",
  })
  @Get()
  @UseGuards(AccessTokenGuard)
  async getNotifications(@Query() query: PaginateQuery, @Req() req: Request) {
    return this.notificationService.findByUserId(query, req["user"]["sub"]);
  }

  @ApiOperation({
    summary: "get announcement",
  })
  @Get("announcement")
  @UseGuards(AccessTokenGuard)
  async getAnnouncement() {
    return this.notificationService.findAnnouncement();
  }

  @ApiOperation({
    summary: "update is read notification",
  })
  @Post(":id")
  @UseGuards(AccessTokenGuard)
  async readNotification(@Req() req: Request, @Param() id: string) {
    const notification = this.notificationService.findOneByIdUser(
      id,
      req["user"]["sub"],
    );
    if (notification) {
      return this.notificationService.readNotification(id);
    } else {
      throw new NotFoundException(message.NOT_FOUND.NOTIFICATION);
    }
  }

  @ApiOperation({
    summary: "create announcement",
  })
  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createAnnouncement(
    @Req() req: Request,
    @Body() notificationDto: NotificationDto,
  ) {
    return this.notificationService.createAnnouncement(notificationDto);
  }

  @ApiOperation({
    summary: "update announcement",
  })
  @Patch(":id")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateAnnouncement(
    @Req() req: Request,
    @Body() notificationDto: UpdateNotificationDto,
    @Param("id") id: string,
  ) {
    return this.notificationService.updateAnnouncement(id, notificationDto);
  }

  @ApiOperation({
    summary: "delete announcement",
  })
  @Delete(":id")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteAnnouncement(@Req() req: Request, @Param("id") id: string) {
    return this.notificationService.deleteAnnouncement(id);
  }
}