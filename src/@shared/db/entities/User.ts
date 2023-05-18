import { table, id, field } from 'sqlite3orm';

@table({ name: 'USERS', autoIncrement: true })
class User {
    @id({ name: 'user_id', dbtype: 'INTEGER NOT NULL' })
    userId!: number;

    @field({ name: 'user_loginname', dbtype: 'TEXT NOT NULL' })
    userLoginName!: string;

    @field({ name: 'user_deleted' })
    deleted?: boolean;

}

export default User