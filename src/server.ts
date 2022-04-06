import express from 'express';
import swaggerUi from "swagger-ui-express";
import { router } from './routes';

import swaggerFile from '../swagger.json';

import createConnection from './database';

createConnection() // Esse "then" você pode apagar, se quiser
    .then(() => console.log('connected to database'));

const app = express();

app.use(express.json());

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));