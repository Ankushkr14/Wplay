"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletRoutes_1 = __importDefault(require("./routes/walletRoutes"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/wallet', walletRoutes_1.default);
app.use('/game', gameRoutes_1.default);
app.listen(3000, () => {
    console.log("Server is running on localhost:3000");
});
exports.default = app;
//# sourceMappingURL=index.js.map