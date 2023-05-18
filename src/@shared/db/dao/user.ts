import { BaseDAO } from "sqlite3orm";
import User from "../entities/User";
import connection from "../connection";

export async function userDAO() {
    return new BaseDAO(User, await connection())
}