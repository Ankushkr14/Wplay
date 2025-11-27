"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncMutex = void 0;
class AsyncMutex {
    queue = Promise.resolve();
    async run(task) {
        const result = this.queue.then(() => task());
        this.queue = result.then(() => { }).catch(() => { });
        return result;
    }
}
exports.AsyncMutex = AsyncMutex;
//# sourceMappingURL=Mutex.js.map