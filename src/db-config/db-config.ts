import "reflect-metadata";

import { DataSource } from "typeorm";

import { Book, User, UserBorrowBook } from "@/entities";
import apiConfig from "@/config/api-config";

export const AppDataSource = new DataSource({
  type: apiConfig.db_config.type as any,
  host: apiConfig.db_config.host,
  port: +apiConfig.db_config.port,
  username: apiConfig.db_config.username,
  password: apiConfig.db_config.password,
  database: apiConfig.db_config.database,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Book,
    UserBorrowBook,
  ],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
