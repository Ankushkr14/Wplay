"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = void 0;
const Mutex_1 = require("../utils/Mutex");
const WALLET_STORE = {};
const getWallet = (userId) => {
    if (!WALLET_STORE[userId]) {
        WALLET_STORE[userId] = {
            userId,
            balance: 0,
            operation: [],
            mutex: new Mutex_1.AsyncMutex(),
        };
    }
    return WALLET_STORE[userId];
};
exports.getWallet = getWallet;
//# sourceMappingURL=store.js.map