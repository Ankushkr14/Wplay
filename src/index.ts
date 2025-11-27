import express from 'express';
import walletRouter from './routes/walletRoutes';
import gameRouter from './routes/gameRoutes';

const app = express();
app.use(express.json());

app.use('/wallet', walletRouter);
app.use('/game', gameRouter);

app.listen(3000, () => {
    console.log("Server is running on localhost:3000");
});

export default app;