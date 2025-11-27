import { AsyncMutex } from "../utils/Mutex";
export interface WalletState {
    userId: string;
    balance: number;
    operation: Operation[];
    mutex: AsyncMutex;
}
export interface Operation {
    type: "topup" | "reward";
    amount: number;
    rewardId?: string;
}
export declare const getWallet: (userId: string) => WalletState;
//# sourceMappingURL=store.d.ts.map