import express from 'express';
import { ApiRoute } from './api/routes';
import { jsonApiResponseMiddleware } from './api/middlewares';
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "../docs/swagger.config";

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(express.json());
app.use(jsonApiResponseMiddleware);

app.get('/api', app.use("/api", ApiRoute));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8000, () => console.log('Server started on port 8000'));

export default app;
