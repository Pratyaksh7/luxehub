"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/productsService';
async function connect() {
    try {
        mongoose_1.default.connect(MONGO_URI);
        console.log("Successfully connected to Product database");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}
exports.connect = connect;
