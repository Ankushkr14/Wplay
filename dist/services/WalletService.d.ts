export interface TransactionResult {
    success: boolean;
    message: string;
    balance?: number;
    status?: "finished" | "idempotent_replay";
}
export declare const processCredit: (userId: string, amount: number, key: string, type: "topup" | "reward", rewardId?: string) => Promise<TransactionResult>;
//# sourceMappingURL=WalletService.d.ts.map