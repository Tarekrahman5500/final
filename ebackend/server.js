const app = require("./app");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});
require('dotenv').config({path: "ebackend/config/.env"});

const connectedDatabases = require("./config/database")
const port = process.env.PORT || 5000
connectedDatabases().catch(console.dir)

const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});