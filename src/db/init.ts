import { AppDataSource } from "../db-config/db-config"

export const db = async (): Promise<void> => {
    if (AppDataSource.isInitialized) {
        console.log('=> CONNECTION IS ALREADY ESTABLISHED')
        return
    }

    await AppDataSource.initialize().then(() => {
        console.log('=> DATABASE CONNECTED')
    }).catch(error => console.log({ error: error.message, message: 'CANNOT CONNECT DATABASE' }))
}