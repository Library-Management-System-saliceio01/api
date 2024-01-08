import "reflect-metadata";

import { DataSource } from "typeorm";

import { Book, User, UserBorrowBook } from "@/entities";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.dbhost,
  port: 3306,
  username: process.env.dbusername,
  password: process.env.dbpassword,
  database: process.env.dbschema,
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
