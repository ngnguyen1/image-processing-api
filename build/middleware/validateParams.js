"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var validateParams = function (req, res, next) {
    var widthQuery = req.query.width;
    var heightQuery = req.query.height;
    var filename = req.query.filename;
    if (!widthQuery) {
        return res.status(400).json({ error: 'Missing required parameter: width' });
    }
    if (!heightQuery) {
        return res.status(400).json({ error: 'Missing required parameter: height' });
    }
    if (!Number.isFinite(Number(widthQuery))) {
        return res
            .status(400)
            .json({ error: 'Invalid parameter: width must be a number' });
    }
    if (!Number.isFinite(Number(heightQuery))) {
        return res
            .status(400)
            .json({ error: 'Invalid parameter: height must be a number' });
    }
    if (!filename) {
        return res
            .status(400)
            .json({ error: 'Missing required parameter: filename' });
    }
    var assetsDir = "".concat(process.cwd(), "/assets/full");
    if (!fs_1.default.existsSync("".concat(assetsDir, "/").concat(filename))) {
        return res
            .status(400)
            .json({ error: 'Invalid parameter: filename does not exist' });
    }
    // If the validation passes, call next() to proceed to the next middleware or route handler
    next();
};
exports.default = validateParams;
