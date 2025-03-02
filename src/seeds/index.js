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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_js_1 = __importDefault(require("../config/connection.js")); // Import connection to database
const index_js_1 = require("../models/index.js"); // Import User and Thought models
const cleanDB_js_1 = __importDefault(require("./cleanDB.js"));
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connection_js_1.default)();
        yield (0, cleanDB_js_1.default)();
        // Create users
        const users = yield index_js_1.User.create([
            {
                username: 'user1',
                email: 'user1@gmail.com',
                password: 'password1',
            },
            {
                username: 'user2',
                email: 'user2@hotmail.com',
                password: 'password2',
            },
            {
                username: 'sarah',
                email: 'sarah4@gmail.com',
                password: 'password3',
            }
        ]);
        // Create thoughts
        const thoughts = yield index_js_1.Thought.create([
            {
                thoughtText: 'This is a thought',
                username: 'user1',
            },
            {
                thoughtText: 'This is another thought',
                username: 'user2',
            },
            {
                thoughtText: 'This is yet another thought',
                username: 'sarah',
            }
        ]);
        // Add thoughts to users
        yield index_js_1.User.findOneAndUpdate({ username: 'user1' }, { $push: { thoughts: thoughts[0]._id } });
        yield index_js_1.User.findOneAndUpdate({ username: 'user2' }, { $push: { thoughts: thoughts[1]._id } });
        yield index_js_1.User.findOneAndUpdate({ username: 'sarah' }, { $push: { thoughts: thoughts[2]._id } });
        // Add reactions to thoughts
        const thoughtId = thoughts[0]._id;
        // Add reactions to the first thought
        yield index_js_1.Thought.findByIdAndUpdate(thoughtId, {
            $addToSet: {
                reactions: {
                    reactionBody: 'This is a reaction',
                    username: 'user1',
                }
            }
        });
        // Add another reaction to the first thought
        yield index_js_1.Thought.findByIdAndUpdate(thoughtId, {
            $addToSet: {
                reactions: {
                    reactionBody: 'This is another reaction',
                    username: 'user2000',
                }
            }
        });
        // Add reactions to the second thought
        const secondThoughtId = thoughts[1]._id; // Get the ID of the second thought
        // Add reactions to the second thought
        yield index_js_1.Thought.findByIdAndUpdate(secondThoughtId, {
            $addToSet: {
                reactions: {
                    reactionBody: 'This is a reaction to the second thought',
                    username: 'sarah',
                }
            }
        });
        // Add another reaction to the second thought
        yield index_js_1.Thought.findByIdAndUpdate(secondThoughtId, {
            $addToSet: {
                reactions: {
                    reactionBody: 'This is another reaction to the second thought',
                    username: 'user1',
                }
            }
        });
        console.table(users);
        console.table(thoughts);
        process.exit(0);
    }
    catch (err) {
        console.error(`Error seeding database: ${err}`);
        process.exit(1);
    }
});
seedDatabase();
