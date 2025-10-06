"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockModel = void 0;
var mongoose_1 = require("mongoose");
var stockSchema = new mongoose_1.default.Schema({
    symbole: String,
    variation: Number,
    cours: Number,
    source: String,
    timestamp: Date
});
exports.StockModel = mongoose_1.default.model('Stock', stockSchema);
