"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMarketOpen = isMarketOpen;
function isMarketOpen() {
    const now = new Date();
    const day = now.getDay(); // 0 = dimanche, 6 = samedi
    const hour = now.getHours();
    // BRVM ouvert du lundi au vendredi, 9h à 15h GMT
    return day >= 1 && day <= 5 && hour >= 9 && hour < 15;
}
