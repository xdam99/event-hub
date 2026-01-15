import express from 'express';
import { ApiRoute } from './api/routes';
import { jsonApiResponseMiddleware } from './api/middlewares';

const app = express();

app.use(express.json());
app.use(jsonApiResponseMiddleware);

app.get('/api', app.use("/api", ApiRoute));

app.listen(8000, () => console.log('Server started on port 8000'));

export default app;
