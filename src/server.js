"use strict";
// import express from 'express'; // Import the express package
// import routes from './routes/index.js'; // Import the routes folder
// import db from './config/connection.js'; // Import the connection file
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
// // Call the db function
// await db();
// // Set the port
// const PORT = process.env.PORT || 3001;
// const app = express(); // Create an instance of the express server
// // Add middleware
// app.use(express.urlencoded({ extended: true}));
// app.use(express.json()); // Parse incoming JSON data
// // Add the routes
// app.use(routes);
// // Start the server
// app.listen(PORT, () => {
//   console.log(`API server running on port ${PORT}!`);
// });
const express_1 = __importDefault(require("express")); // Import the express package
const index_js_1 = __importDefault(require("./routes/index.js")); // Import the routes folder
const connection_js_1 = __importDefault(require("./config/connection.js")); // Import the connection file
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Call the db function
    yield (0, connection_js_1.default)();
    // Set the port
    const PORT = process.env.PORT || 3001;
    const app = (0, express_1.default)(); // Create an instance of the express server
    // Add middleware
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json()); // Parse incoming JSON data
    // Add the routes
    app.use(index_js_1.default);
    // Start the server
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
}))();
