"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WalletService_1 = require("../services/WalletService");
const store_1 = require("../models/store");
const walletRouter = (0, express_1.Router)();
walletRouter.post("/topup", async (req, res) => {
    const { userId, amount, key } = req.body;
    try {
        const result = await (0, WalletService_1.processCredit)(userId, Number(amount), key, "topup");
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
walletRouter.get("/:userId", (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Missing userId",
            });
        }
        const wallet = (0, store_1.getWallet)(userId);
        return res.status(200).json({
            success: true,
            message: "Wallet fetched successfully",
            balance: wallet.balance,
            operations: wallet.operation
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.default = walletRouter;
//# sourceMappingURL=walletRoutes.js.map