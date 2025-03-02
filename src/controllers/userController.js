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
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const index_js_1 = require("../models/index.js"); // Import the User model
// Find all users
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield index_js_1.User.find(); // Find all users
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllUsers = getAllUsers;
// Get a user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.findById(req.params.id); // Find a user by id
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" }); // Check if user exists
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUserById = getUserById;
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.create(req.body); // Create a new user
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createUser = createUser;
// Update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Find a user by id and update it
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateUser = updateUser;
// Delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.findByIdAndDelete(req.params.id); // Find a user by id and delete it
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteUser = deleteUser;
// Add a friend to a user
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendId = req.body.userId; // Extract the userId from the request body
        const user = yield index_js_1.User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: friendId } }, // Add the friendId directly
        { new: true }); // Find a user by id and add a friend
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addFriend = addFriend;
// Remove a friend from a user
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true }); // Find a user by id and remove a friend
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeFriend = removeFriend;
