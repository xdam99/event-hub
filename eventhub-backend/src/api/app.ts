import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApiResponseMiddleware, errorHandlerMiddleware } from './middlewares/index';
import { getEnvVariable } from './utility/index';
import Router from './routes/index';
import cookieParser from 'cookie-parser';
import { initializeMongoose } from './config/mongoose.config';

dotenv.config();

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    if(req.headers['access-control-request-private-network'] === 'true') {
        res.setHeader('Access-Control-Allow-Private-Network', 'true');
    }
    next();
})


app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(ApiResponseMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use('/api', Router);

app.use(errorHandlerMiddleware);

const PORT = getEnvVariable('PORT') || 3000;

const startServer = async () => {
    await initializeMongoose();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT}`);
        console.log(`Swagger docs : http://localhost:${PORT}/api/doc`);
    });
}

startServer().then(() => console.log('Server started successfully'))