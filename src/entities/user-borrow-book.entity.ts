import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";

@Entity()
export class UserBorrowBook {
    constructor(
        user: User,
        book: Book,
    ) {
        this.user = user
        this.book = book
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'boolean', default: false })
    returned: boolean

    @ManyToOne(() => User, user => user.userBorrowBook)
    user: User

    @ManyToOne(() => Book, book => book.userBorrowBook)
    book: Book

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date
}