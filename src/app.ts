import express, { Application } from 'express';
import cors from "cors"
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import deviceInfoMiddleware from './app/utils/detectDevice';
const app: Application = express()

// Parse incoming JSON requests
app.use(express.json());
// Enable CORS for cross-origin requests
app.use(cors());
app.use(deviceInfoMiddleware);

// Health Route
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        app: "Tally Inventory Management System",
        version: "1.0.0",
    });
});

app.use("/api/v1", router );

app.use(globalErrorHandler)
// Not Fount Route
app.use(notFound)

export default app