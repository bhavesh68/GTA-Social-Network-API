"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = exports.Thought = exports.User = void 0;
const User_js_1 = __importDefault(require("./User.js")); // Import the User model
exports.User = User_js_1.default;
const Thought_js_1 = require("./Thought.js"); // Import the Thought and Reaction models
Object.defineProperty(exports, "Thought", { enumerable: true, get: function () { return Thought_js_1.Thought; } });
Object.defineProperty(exports, "Reaction", { enumerable: true, get: function () { return Thought_js_1.Reaction; } });
