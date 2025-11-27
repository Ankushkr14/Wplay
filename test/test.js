const http = require("http");
const now = () => Date.now();

const post = (path, body) => {
    return new Promise((resolve, reject) => {
        const req = http.request(
            {
                hostname: "localhost",
                port: 3000,
                path,
                method: "POST",
                headers: { "Content-Type": "application/json" }
            },
            (res) => {
                let data = "";
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => resolve(JSON.parse(data)));
            }
        );

        req.on("error", reject);
        req.write(JSON.stringify(body));
        req.end();
    });
};

const get = (path) => {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:3000${path}`, (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => resolve(JSON.parse(data)));
        }).on("error", reject);
    });
};

const runTest = async () => {
    console.log("Starting concurrency test at:", now());

    const userId = "concurrent_user";

    console.log("\n--- Sending parallel requests ---");

    console.log("Topup start:", now());
    const p1 = post("/wallet/topup", {
        userId,
        amount: 100,
        key: "ktopup"
    }).then((res) => {
        console.log("Topup end:", now(), res);
        return res;
    });

    console.log("Reward start:", now());
    const p2 = post("/game/reward", {
        userId,
        amountCoins: 50,
        rewardId: "rw_concurrent",
        key: "kreward"
    }).then((res) => {
        console.log("Reward end:", now(), res);
        return res;
    });

    await Promise.all([p1, p2]);

    console.log("\n--- Fetching final wallet state ---");

    const final = await get(`/wallet/${userId}`);

    console.log("Final result:", final);

    if (final.balance === 150) {
        console.log("TEST PASSED: Concurrency handled correctly (150)");
    } else {
        console.log("TEST FAILED: Balance incorrect");
    }
};

runTest();
