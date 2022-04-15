"use strict";
// 类型声明
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var query_string_1 = __importDefault(require("query-string"));
query_string_1.default.parse('?key=value&key2=value2');
// declare function camelCase (input: string): string
var res = lodash_1.camelCase('hello typed');
//# sourceMappingURL=20-definitely-typed.js.map