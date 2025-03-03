import express, { Application, Request, Response } from 'express';
import cors from "cors"
const app: Application = express()

// Parse incoming JSON requests
app.use(express.json());
// Enable CORS for cross-origin requests
app.use(cors());

app.get('/', (req: Request, res: Response) => {})

export default app