"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thoughtRouter = void 0;
const express_1 = require("express"); // Import the Router class
const router = (0, express_1.Router)(); // Create a new router object
exports.thoughtRouter = router;
const thoughtController_js_1 = require("../../controllers/thoughtController.js"); // Import the thought controller functions
// /api/thoughts
router.route("/").get(thoughtController_js_1.getAllThoughts).post(thoughtController_js_1.createThought); // Set up GET all and POST at /api/thoughts
// /api/thoughts/:id
router.route("/:id").get(thoughtController_js_1.getThoughtById).put(thoughtController_js_1.updateThought).delete(thoughtController_js_1.deleteThought); // Set up GET one, PUT, and DELETE at /api/thoughts/:id
// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(thoughtController_js_1.addReaction); // Set up POST at /api/thoughts/:thoughtId/reactions
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(thoughtController_js_1.removeReaction); // Set up DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
