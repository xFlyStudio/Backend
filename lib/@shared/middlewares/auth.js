"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../utils/auth");
async function authentication(req, res, next) {
    let token;
    try {
        token = req.headers['authorization'].split(' ')[1];
    }
    catch (e) {
        token = '';
    }
    const result = await auth_1.JWT.verify(token);
    if (!result) {
        res.status(400);
        return;
    }
    next();
}
;
exports.default = authentication;
//# sourceMappingURL=auth.js.map