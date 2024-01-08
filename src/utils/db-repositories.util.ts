import { Repository } from "typeorm"

import AppDataSource from "@/db-config/db-config"

import { Book, User, UserBorrowBook } from "@/entities"

export const userRepository = function userRepository(): Repository<User> { return AppDataSource.getRepository(User) }()
export const bookRepository = function bookRepository(): Repository<Book> { return AppDataSource.getRepository(Book) }()
export const userBorrowBookRepository = function userBorrowBookRepository(): Repository<UserBorrowBook> { return AppDataSource.getRepository(UserBorrowBook) }()