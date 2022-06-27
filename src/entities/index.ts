import * as Koa from 'koa'
import { DefaultState, DefaultContext, ParameterizedContext } from 'koa'
import { createConnection, Connection } from 'typeorm'
import { config } from "dotenv"
import 'colors'
import { PostEntity } from './posts.entity';
import { UsersEntity } from './users.entity';

config()

const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env
console.log({ DB_HOST, DB_USER, DB_PASS })

export const connectWithDB = async (app: Koa<DefaultState, DefaultContext>): Promise<void> => {
    const connection: Connection = await createConnection({
        type: 'postgres',
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASS,
        database: DB_DATABASE,
        entities: [PostEntity, UsersEntity],
    })
    await connection.synchronize(true)
        .then(() => console.log(`Syncronized with database`.green.bold))
        .catch(() => console.log(`Failed to Syncronized with database`.red.bold))
    app.context.db = connection

}