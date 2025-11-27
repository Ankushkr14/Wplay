import { TransactionResult } from "../services/WalletService";
export type KeyStatus = "pending" | "completed";
export interface KeyRecord {
    key: string;
    userId: string;
    status: KeyStatus;
    promise?: Promise<TransactionResult>;
    result?: TransactionResult;
}
export declare const KEY_STORE: Record<string, KeyRecord>;
export declare const getRecord: (key: string) => KeyRecord | undefined;
export declare const setRecord: (key: string, record: KeyRecord) => void;
export declare const deleteRecord: (key: string) => void;
//# sourceMappingURL=key.d.ts.map