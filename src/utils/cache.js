"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
class SimpleCache {
    constructor() {
        this.store = new Map();
    }
    set(key, value) {
        this.store.set(key, value);
    }
    get(key) {
        return this.store.get(key);
    }
    has(key) {
        return this.store.has(key);
    }
    clear() {
        this.store.clear();
    }
    keys() {
        return Array.from(this.store.keys());
    }
    tx() {
        const result = {};
        for (const [key, value] of this.store.entries()) {
            result[key] = value;
        }
        return result;
    }
}
exports.cache = new SimpleCache();
