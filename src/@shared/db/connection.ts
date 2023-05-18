import { SqlDatabase } from 'sqlite3orm';

const FILE = './sqlite3.db'

export default async function connection() {
    let sqldb = new SqlDatabase();
    // await sqldb.open(':memory:'); // would open a memory database in private mode
    await sqldb.open(FILE) // opens a memory database in shared mode
    return sqldb
}