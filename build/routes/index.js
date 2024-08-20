"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validateParams_1 = __importDefault(require("../middleware/validateParams"));
var images_1 = __importDefault(require("./api/images"));
var router = express_1.default.Router();
// Define your routes here
router.use('/images', validateParams_1.default, images_1.default);
exports.default = router;
