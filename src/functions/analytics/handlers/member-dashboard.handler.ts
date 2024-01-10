import { User, UserBorrowBook } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { UserBorrowBookService } from "@/services";
import { formatJSONResponse } from "@/utils";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    let booksBorrowedByUser: UserBorrowBook[] = []
    let overDueBooksByUser: UserBorrowBook[] = []

    try {
        booksBorrowedByUser = await UserBorrowBookService.booksBorrowedByUser(event.userMetadata)
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }

    try {
        overDueBooksByUser = await UserBorrowBookService.overDueBooksByUser(event.userMetadata)
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }

    return formatJSONResponse({
        booksBorrowedByUser,
        overDueBooksByUser,
    })
}

export const memberDashboardHandler = request