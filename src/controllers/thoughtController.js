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
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getThoughtById = exports.getAllThoughts = void 0;
const index_js_1 = require("../models/index.js"); // Import Thought and Reaction models
const index_js_2 = require("../models/index.js"); // Import User model
// Get all thoughts
const getAllThoughts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield index_js_1.Thought.find(); // Find all thoughts
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllThoughts = getAllThoughts;
// Get thought by ID
const getThoughtById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Destructure id from request parameters
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid thought ID format" }); // Check if id is a valid ObjectId
        }
        const thought = yield index_js_1.Thought.findById(id); // Find thought by id
        if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.getThoughtById = getThoughtById;
// create new thought for a user where the user is identified by the username in the request body,
// and the created thought id is added to the user's thoughts array field
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield index_js_1.Thought.create(req.body); // Create new thought
        const user = yield index_js_2.User.findOneAndUpdate(// Find user by username and update
        { username: req.body.username }, // Destructure username from request body
        { $push: { thoughts: thought._id } }, // Push new thought to thoughts array
        { new: true } // Validate input and return new user
        );
        if (!user) {
            return res.status(404).json({ message: "Thought created, but no user found" }); // Check if user exists
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.createThought = createThought;
// Update thought by ID
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Destructure id from request parameters
        const thought = yield index_js_1.Thought.findByIdAndUpdate(// Find thought by id and update
        id, req.body, // Destructure updated thought from request body
        { new: true, runValidators: true } // Validate input and return new thought
        );
        if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.updateThought = updateThought;
// Delete thought by ID and remove it from the associated user's thoughts array field
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Destructure id from request parameters
        const thought = yield index_js_1.Thought.findByIdAndDelete(id); // Find thought by id and delete
        if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
        }
        yield index_js_2.User.findOneAndUpdate(// Find user by username and update
        { username: thought.username }, // Destructure username from thought
        { $pull: { thoughts: thought._id } }, // Pull thought from thoughts array
        { new: true } // Validate input and return new user
        );
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.deleteThought = deleteThought;
// Create new reaction
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reactionBody } = req.body; // Destructure reactionBody from request body
        const reaction = new index_js_1.Reaction({ reactionBody }); // Create new Reaction instance
        const thought = yield index_js_1.Thought.findByIdAndUpdate(// Find thought by id and update
        req.params.thoughtId, // Destructure thoughtId from request parameters
        { $push: { reactions: reaction } }, // Push new reaction to reactions array
        { new: true } // Validate input and return new thought
        );
        if (!thought) {
            res.status(404).json({ message: "Reaction created, but no thought found with this id" }); // Check if thought exists
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addReaction = addReaction;
// Remove reaction
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield index_js_1.Thought.findByIdAndUpdate(// Find thought by id and update
        req.params.thoughtId, // Destructure thoughtId from request parameters
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Pull reaction by reactionId
        { new: true } // Validate input and return new thought
        );
        if (!thought) {
            res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeReaction = removeReaction;
