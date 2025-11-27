import { Request, Response, Router } from "express";
import { processCredit } from "../services/WalletService";

const gameRouter = Router();

gameRouter.post("/reward", async (req: Request, res: Response) => {
    try {
        const { userId, amountCoins, rewardId, key } = req.body;
        if(!userId || !amountCoins || !rewardId || !key) {
            return res.status(400).json({
                success: false,
                message: "Missing parameters"
            });
        }

        const result = await processCredit(userId, Number(amountCoins), key, "reward", rewardId);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


export default gameRouter;