"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express"); // Import the Router class
const router = (0, express_1.Router)(); // Create a new instance of the Router class
exports.userRouter = router;
const userController_js_1 = require("../../controllers/userController.js"); // Import the user controller functions
// /api/users
router.route("/").get(userController_js_1.getAllUsers).post(userController_js_1.createUser); // Create a new route for the /api/users endpoint
// /api/users/:id
router.route("/:id").get(userController_js_1.getUserById).put(userController_js_1.updateUser).delete(userController_js_1.deleteUser); // Create a new route for the /api/users/:id endpoint
// /api/users/:userId/friends
router.route("/:userId/friends").post(userController_js_1.addFriend); // Create a new route for the /api/users/:userId/friends endpoint
// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(userController_js_1.removeFriend); // Create a new route for the /api/users/:userId/friends/:friendId endpoint
