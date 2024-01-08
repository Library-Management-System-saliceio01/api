import { Column, CreateDateColumn, Entity, FindOperator, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserBorrowBook } from "./user-borrow-book.entity";

@Entity()
export class Book {
    constructor(
        title: string,
        author: string,
        genre: string,
        isbn: string,
        totalCopies: number,
    ) {
        this.title = title
        this.author = author
        this.genre = genre
        this.isbn = isbn
        this.totalCopies = totalCopies
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'varchar' })
    author: string | FindOperator<string>

    @Column({ type: 'varchar' })
    genre: string | FindOperator<string>

    @Column({ type: 'varchar' })
    isbn: string | FindOperator<string>

    @Column({ type: 'bigint' })
    totalCopies: number

    @Column({ type: 'boolean', default: false })
    isBorrowed?: boolean

    @OneToMany(() => UserBorrowBook, userBorrowBook => userBorrowBook.book)
    userBorrowBook: UserBorrowBook[]

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date
}
