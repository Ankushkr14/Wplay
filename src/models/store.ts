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

const WALLET_STORE: Record<string, WalletState> = {};

export const getWallet = (userId: string): WalletState => {
    if (!WALLET_STORE[userId]) {
        WALLET_STORE[userId] = {
            userId,
            balance: 0,
            operation: [],
            mutex: new AsyncMutex(),
        };
    }
    return WALLET_STORE[userId];
};
