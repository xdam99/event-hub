import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApiResponseMiddleware, errorHandlerMiddleware } from './middlewares/index';
import { getEnvVariable } from './utility/index';
import Router from './routes/index';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(ApiResponseMiddleware);

app.use('/api', Router);

app.use(errorHandlerMiddleware);

const PORT = getEnvVariable('PORT') || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`);
    console.log(`Swagger docs à l'adresse : http://localhost:${PORT}/api/doc`);
});