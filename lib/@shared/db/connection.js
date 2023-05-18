"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3orm_1 = require("sqlite3orm");
const FILE = './sqlite3.db';
async function connection() {
    let sqldb = new sqlite3orm_1.SqlDatabase();
    // await sqldb.open(':memory:'); // would open a memory database in private mode
    await sqldb.open(FILE); // opens a memory database in shared mode
    return sqldb;
}
exports.default = connection;
//# sourceMappingURL=connection.js.map