"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WalletService_1 = require("../services/WalletService");
const gameRouter = (0, express_1.Router)();
gameRouter.post("/reward", async (req, res) => {
    try {
        const { userId, amountCoins, rewardId, key } = req.body;
        if (!userId || !amountCoins || !rewardId || !key) {
            return res.status(400).json({
                success: false,
                message: "Missing parameters"
            });
        }
        const result = await (0, WalletService_1.processCredit)(userId, Number(amountCoins), key, "reward", rewardId);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
exports.default = gameRouter;
//# sourceMappingURL=gameRoutes.js.map