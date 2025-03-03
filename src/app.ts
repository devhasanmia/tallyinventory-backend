import express, { Application, Request, Response } from 'express';
import cors from "cors"
import { UnitRoutes } from './app/modules/Unit/unit.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express()

// Parse incoming JSON requests
app.use(express.json());
// Enable CORS for cross-origin requests
app.use(cors());

// Health Route
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        app: "Tally Inventory Management System",
        version: "1.0.0",
    });
});

app.use("/api/v1/unit", UnitRoutes );

app.use(globalErrorHandler)

export default app