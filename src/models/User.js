"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose"); // import types
// create user model
const userSchema = new mongoose_1.Schema({
    username: {
        type: String, // username is a string
        required: true, // username is required
        unique: true, // username is unique
        trim: true, // removes whitespace from the beginning and end of a string
    },
    email: {
        type: String, // email is a string
        required: true, // email is required
        unique: true, // email is unique
        match: [/.+@.+\..+/, 'Must match an email address!'], // must match an email address
    },
    thoughts: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId, // _id values are stored in an array
                ref: 'Thought', // the ref property establishes the relationship between the data in the thoughts array and the Thought model
            },
        ],
        default: [],
    },
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId, // _id values are stored in an array
            ref: 'User', // the ref property establishes the relationship between the data in the friends array and the User model
        },
    ],
}, {
    toJSON: {
        virtuals: true, // include virtual properties when data is requested
    },
    timestamps: true, // include timestamps (createdAt and updatedAt)
    id: false // disable the default virtual id property use _id instead
});
// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
    return this.friends.length; // return the length of the user's friends array field on query
});
const User = (0, mongoose_1.model)('User', userSchema); // create the User model using the userSchema
exports.default = User; // export the User model
