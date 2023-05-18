"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addPrefixMapper = (prefix) => {
    return (route) => {
        route.path = `${prefix}${route.path}`;
        return route;
    };
};
exports.default = addPrefixMapper;
//# sourceMappingURL=addPrefixMapper.js.map