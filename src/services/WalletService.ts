import { deleteRecord, getRecord, KeyRecord, setRecord } from "../models/key";
import { getWallet } from "../models/store";

export interface TransactionResult {
    success: boolean;
    message: string;
    balance?: number;
    status?: "finished" | "idempotent_replay";
}

export const processCredit = async (
    userId: string,
    amount: number,
    key: string,
    type: "topup" | "reward",
    rewardId?: string
): Promise<TransactionResult> => {
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

    const existing = getRecord(key);
    if (existing?.status === "completed" && existing.result) {
        return {
            ...existing.result,
            status: "idempotent_replay",
        };
    }

    if (existing?.promise) {
        return existing.promise;
    }

    const record: KeyRecord = {
        key: key,
        userId,
        status: "pending",
    };

    const wallet = getWallet(userId);

    const promise = wallet.mutex.run(async () => {
        try {
            wallet.balance += amount;

            wallet.operation.push({
                type,
                amount,
                rewardId: rewardId ?? "",
            });

            const result: TransactionResult = {
                success: true,
                message: "Credit successful",
                balance: wallet.balance,
                status: "finished",
            };

            record.status = "completed";
            record.result = result;

            setRecord(key, record);
            return result;

        } catch (error) {
            deleteRecord(key);
            console.log("Error in processing Credit: ", error);
            return {
                success: false,
                message: "Error occured during credit transaction",
            };
        }
    });

    record.promise = promise;
    setRecord(key, record);
    
    return record.promise;
};
