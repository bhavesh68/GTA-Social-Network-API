"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../models/index.js");
const cleanDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_js_1.User.deleteMany({});
        yield index_js_1.Thought.deleteMany({});
        yield index_js_1.Reaction.deleteMany({});
        console.log('Database cleaned.');
    }
    catch (err) {
        console.error('Error cleaning database:', err);
    }
});
exports.default = cleanDB;
