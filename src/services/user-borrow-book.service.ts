import { Book, User, UserBorrowBook } from "@/entities";
import { userBorrowBookRepository } from "@/utils";
import { BookService } from "./book.service";
import moment from "moment";
import { LessThanOrEqual } from "typeorm";

export class UserBorrowBookService {
    static userBorrowBookRepository = userBorrowBookRepository

    static async borrowBook(data: { user: User, book: Book }): Promise<UserBorrowBook> {
        data.book.isBorrowed = true

        await BookService.updateBook(data.book)

        //Expiration time is 1 week
        return await this.userBorrowBookRepository.save({ ...data, expirationDate: moment().add(1, 'weeks').toDate() })
    }

    static async returnBook(book: Book): Promise<UserBorrowBook> {
        book.isBorrowed = false

        await BookService.updateBook(book)

        let userBorrowBook: UserBorrowBook = await this.getUserBorrowBook(book)

        userBorrowBook.returned = true

        return await this.userBorrowBookRepository.save(userBorrowBook)
    }

    static async getUserBorrowBook(book: Book): Promise<UserBorrowBook> {
        return await this.userBorrowBookRepository.findOneOrFail({
            where: {
                book: {
                    id: book.id,
                },
                returned: false,
            }
        })
    }

    static async countUserBorrowedBooks(): Promise<number> {
        return this.userBorrowBookRepository.count({
            where: {
                returned: false,
            }
        })
    }

    static async usersWithBooksBorrowedExpirated(): Promise<User[]> {
        let users: User[] = []

        let userBorrowBooks: UserBorrowBook[] = await this.userBorrowBookRepository.find({
            relations: {
                user: true,
            },
            where: {
                expirationDate: LessThanOrEqual(moment().toDate()),
                returned: false,
            }
        })

        userBorrowBooks.forEach((userBorrowBook: UserBorrowBook) => {
            users.push(userBorrowBook.user)
        })

        return users
    }

    static async booksBorrowedByUser(user: User): Promise<UserBorrowBook[]> {
        let userBorrowBooks: UserBorrowBook[] = await this.userBorrowBookRepository.find({
            relations: {
                book: true,
            },
            where: {
                returned: false,
                user: {
                    id: user.id,
                }
            }
        })

        return userBorrowBooks
    }

    static async overDueBooksByUser(user: User): Promise<UserBorrowBook[]> {
        let userBorrowBooks: UserBorrowBook[] = await this.userBorrowBookRepository.find({
            relations: {
                book: true,
            },
            where: {
                expirationDate: LessThanOrEqual(moment().toDate()),
                returned: false,
                user: {
                    id: user.id,
                }
            }
        })

        return userBorrowBooks
    }
}