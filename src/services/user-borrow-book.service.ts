import { Book, User, UserBorrowBook } from "@/entities";
import { userBorrowBookRepository } from "@/utils";
import { BookService } from "./book.service";

export class UserBorrowBookService {
    static userBorrowBookRepository = userBorrowBookRepository

    static async borrowBook(data: { user: User, book: Book }): Promise<UserBorrowBook> {
        data.book.isBorrowed = true

        await BookService.updateBook(data.book)

        return await this.userBorrowBookRepository.save(data)
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
                    isBorrowed: true
                }
            }
        })
    }
}