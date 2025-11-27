import { Request, Response, Router } from "express";
import { processCredit } from "../services/WalletService";
import { getWallet } from "../models/store";

const walletRouter = Router();

walletRouter.post("/topup", async (req: Request, res: Response) => {
    const { userId, amount, key } = req.body;
    try {
        const result = await processCredit(userId, Number(amount), key, "topup");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

walletRouter.get("/:userId", (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Missing userId",
            });
        }
        const wallet = getWallet(userId);

        return res.status(200).json({
            success: true,
            message: "Wallet fetched successfully",
            balance: wallet.balance,
            operations: wallet.operation
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

export default walletRouter;
