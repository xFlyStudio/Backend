"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3orm_1 = require("sqlite3orm");
let User = class User {
    userId;
    userLoginName;
    deleted;
};
__decorate([
    (0, sqlite3orm_1.id)({ name: 'user_id', dbtype: 'INTEGER NOT NULL' }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, sqlite3orm_1.field)({ name: 'user_loginname', dbtype: 'TEXT NOT NULL' }),
    __metadata("design:type", String)
], User.prototype, "userLoginName", void 0);
__decorate([
    (0, sqlite3orm_1.field)({ name: 'user_deleted' }),
    __metadata("design:type", Boolean)
], User.prototype, "deleted", void 0);
User = __decorate([
    (0, sqlite3orm_1.table)({ name: 'USERS', autoIncrement: true })
], User);
exports.default = User;
//# sourceMappingURL=User.js.map