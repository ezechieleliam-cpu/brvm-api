"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMarketOpen = isMarketOpen;
function isMarketOpen() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getUTCHours(); // BRVM = GMT
    return day >= 1 && day <= 5 && hour >= 9 && hour < 15;
}
