# PlayKraft Wallet Service

In-memory wallet service that powers Kraft Coin wallets with topup, reward and a simple concurrency test.

- **Language:** Node.js + TypeScript
- **APIs:** `POST /wallet/topup`, `POST /game/reward`, `GET /wallet/:userId`

## Install

```bash
npm install
```

## Build and Run

```bash
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

## Concurrency Smoke Test

The repository includes `test/test.js`, which fires a top-up and reward concurrently and asserts the final balance.

1. Start the server in one terminal: `npm run dev`
2. In a second terminal, execute:
	```bash
	node test/test.js
	```
3. The script prints intermediate responses and reports pass/fail based on a final balance of 150 Kraft Coins.

## Notes

- The service is fully in-memory; restarting the process clears all data.
- Idempotency keys must be unique per credit path; resending the same key replays the stored result without double crediting.
