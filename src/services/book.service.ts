import { Book } from "@/entities";
import { bookRepository } from "@/utils";
import moment from "moment";
import { DeleteResult, FindManyOptions, Like } from "typeorm";

export class BookService {
    static bookRepository = bookRepository

    static async createBook(book: Book): Promise<Book> {
        return await this.bookRepository.save(book)
    }

    static async deleteBook(bookId: string): Promise<DeleteResult> {
        return await this.bookRepository.delete(bookId)
    }

    static async getBook(bookId: string): Promise<Book> {
        return await this.bookRepository.findOneOrFail({
            where: {
                id: bookId
            }
        })
    }

    static async getBooksPaginated(page: number, size: number): Promise<{ data: Book[], totalCount: number }> {
        return {
            data: await this.bookRepository.find({
                take: size,
                skip: page * size
            }),
            totalCount: await this.bookRepository.count()
        }
    }

    static async updateBook(book: Book): Promise<Book> {
        return await this.bookRepository.save(book)
    }

    static async findBooks({ title, author, genre, page, size }: { title?: string, author?: string, genre?: string, page?: number, size?: number }): Promise<{ data: Book[], totalCount: number }> {
        let findOptions: FindManyOptions<Book> = {}

        if (page && size) {
            findOptions = {
                take: size,
                skip: page * size
            }
        }

        if (title) {
            findOptions = {
                ...findOptions,
                where: {
                    title: Like(title),
                },
            }
        }

        if (author) {
            findOptions = {
                ...findOptions,
                where: {
                    ...findOptions.where,
                    author: Like(author),
                },
            }
        }

        if (genre) {
            findOptions = {
                ...findOptions,
                where: {
                    ...findOptions.where,
                    genre: Like(genre),
                },
            }
        }

        return {
            data: await this.bookRepository.find(findOptions),
            totalCount: await this.bookRepository.count()
        }
    }

    static async countBooks(): Promise<number> {
        return await this.bookRepository.count()
    }

    static async booksBorrowedExpiratedToday(): Promise<Book[]> {
        return this.bookRepository.find({
            where: {
                userBorrowBook: {
                    expirationDate: Like(moment().toDate()),
                    returned: false,
                }
            }
        })
    }
}