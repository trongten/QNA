import { DataSource } from "typeorm";
import { User } from "../entity/users.entity";

export const usersProviders = [
  {
    provide: "USERS_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ["DATA_SOURCE"]
  }
];
