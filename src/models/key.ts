import { TransactionResult } from "../services/WalletService";

export type KeyStatus = "pending" | "completed";

export interface KeyRecord {
    key: string;
    userId: string;
    status: KeyStatus;
    promise?: Promise<TransactionResult>;
    result?: TransactionResult;
}

export const KEY_STORE: Record<string, KeyRecord> = {};

export const getRecord = (key: string): KeyRecord | undefined => {
    return KEY_STORE[key];
};

export const setRecord = (key: string, record: KeyRecord): void => {
    KEY_STORE[key] = record;
};

export const deleteRecord = (key: string): void => {
    delete KEY_STORE[key];
};
