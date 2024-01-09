import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { UserBorrowBook } from "./user-borrow-book.entity";

@Entity()
@Unique(['username'])
export class User {
    constructor(
        username: string,
        password: string,
        role: string,
        name?: string,
    ) {
        this.username = username
        this.password = password
        this.role = role
        this.name = name
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', nullable: true })
    name?: string

    @Column({ type: 'varchar' })
    username: string

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'varchar' })
    role: string

    @OneToMany(() => UserBorrowBook, userBorrowBook => userBorrowBook.user)
    userBorrowBook: UserBorrowBook[]

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date
}