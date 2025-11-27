In this project, in-memory wallet service is created that safely handles concurrent balance updates and prevents duplicate transactions. To handle concurrency,a mutex(mutual Exclusion lock) is used, which ensures that only one operation can update a user's wallet at a time, preventing race conditions when top-up and reward requests arrive together. Idempotency key are store in map to ensure duplicate transactions are not applied again if the same request is retry. Each operation goes through the mutex,then updates the balance if necessary otherwise it will be skipped. 

A small test client sends parallel requests to confirm how the system processes them and returns the correct final balance.

## Install, Build and Run

```bash
npm install
npm run dev
```

The command transpiles TypeScript into `dist/` and starts the HTTP server on `http://localhost:3000`.

## Manual Checks

1. Top up a wallet.
	```bash
	curl -X POST http://localhost:3000/wallet/topup \
	  -H "Content-Type: application/json" \
	  -d '{"userId":"demo","amount":100,"key":"topup-1"}'
	```
2. Credit a reward.
	```bash
	curl -X POST http://localhost:3000/game/reward \
	  -H "Content-Type: application/json" \
	  -d '{"userId":"demo","amountCoins":50,"rewardId":"rw-1","key":"reward-1"}'
	```
3. Inspect the wallet.
	```bash
	curl http://localhost:3000/wallet/demo
	```

## Test

1. Start the server in one terminal: `npm run dev`
2. In a second terminal, execute:
	```bash
	node test/test.js
	```
3. The script prints intermediate responses and reports pass/fail based on a final balance of 150 Kraft Coins.

