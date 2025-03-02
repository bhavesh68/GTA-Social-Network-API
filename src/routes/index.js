"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Import the Router class from express
const userRoutes_js_1 = require("./api/userRoutes.js"); // Import the userRouter from userRoutes
const thoughtRoutes_js_1 = require("./api/thoughtRoutes.js"); // Import the thoughtRouter from thoughtRoutes
// Create a new router to handle all the routes
const router = (0, express_1.Router)();
// Use the userRouter and thoughtRouter with the /users and /thoughts paths
router.use('/users', userRoutes_js_1.userRouter);
router.use('/thoughts', thoughtRoutes_js_1.thoughtRouter);
exports.default = router;
