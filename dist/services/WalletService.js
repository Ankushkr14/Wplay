"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCredit = void 0;
const key_1 = require("../models/key");
const store_1 = require("../models/store");
const processCredit = async (userId, amount, key, type, rewardId) => {
    if (!userId) {
        return {
            success: false,
            message: "Missing userId",
        };
    }
    if (!key) {
        return {
            success: false,
            message: "Missing key",
        };
    }
    if (amount <= 0) {
        return {
            success: false,
            message: "Amount must be positive",
        };
    }
    const existing = (0, key_1.getRecord)(key);
    if (existing?.status === "completed" && existing.result) {
        return {
            ...existing.result,
            status: "idempotent_replay",
        };
    }
    if (existing?.promise) {
        return existing.promise;
    }
    const record = {
        key: key,
        userId,
        status: "pending",
    };
    const wallet = (0, store_1.getWallet)(userId);
    const promise = wallet.mutex.run(async () => {
        try {
            wallet.balance += amount;
            wallet.operation.push({
                type,
                amount,
                rewardId: rewardId ?? "",
            });
            const result = {
                success: true,
                message: "Credit successful",
                balance: wallet.balance,
                status: "finished",
            };
            record.status = "completed";
            record.result = result;
            (0, key_1.setRecord)(key, record);
            return result;
        }
        catch (error) {
            (0, key_1.deleteRecord)(key);
            console.log("Error in processing Credit: ", error);
            return {
                success: false,
                message: "Error occured during credit transaction",
            };
        }
    });
    record.promise = promise;
    (0, key_1.setRecord)(key, record);
    return record.promise;
};
exports.processCredit = processCredit;
//# sourceMappingURL=WalletService.js.map