import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { router } from './routes';
import swaggerFile from '../swagger.json';
import createConnection from './database';
import "./shared/container";
import './database';
import { AppError } from './errors/AppError';


createConnection() // Esse "then" você pode apagar, se quiser
    .then(() => console.log('connected to database'));

const app = express();

app.use(express.json());

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
});

app.listen(3333, () => console.log("Server is running!"));