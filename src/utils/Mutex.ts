export class AsyncMutex {
    private queue: Promise<void> = Promise.resolve();

    public async run<T>(task: () => Promise<T>): Promise<T> {
        const result = this.queue.then(() => task());
        this.queue = result.then(() => {}).catch(() => {});

        return result;
    }
}