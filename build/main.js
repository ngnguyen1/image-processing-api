"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var port = 3000;
app.get('/_healthcheck', function (req, res) {
    res.status(200).send({
        product: 'image-processing-api',
        env: 'dev',
    });
});
app.use('/api', routes_1.default);
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
// Exporting app to use it in the unit testing
exports.default = app;
