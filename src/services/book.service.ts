import { Book } from "@/entities";
import { bookRepository } from "@/utils";
import { DeleteResult, FindManyOptions } from "typeorm";

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

        findOptions = {
            ...findOptions,
            where: {
                title: title || undefined,
                author: author || undefined,
                genre: genre || undefined,
            },
        }

        return {
            data: await this.bookRepository.find(findOptions),
            totalCount: await this.bookRepository.count()
        }
    }
}