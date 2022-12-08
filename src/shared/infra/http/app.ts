import upload from '@config/upload';
import { AppError } from '@errors/AppError';
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import createConnection from '@shared/infra/typeorm';
import cors from 'cors';
import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import 'reflect-metadata';
import swaggerUI from "swagger-ui-express";
import swaggerFile from '../../../swagger.json';
import "../../container";
import '../typeorm';
import { router } from './routes';


createConnection() // Esse "then" você pode apagar, se quiser
    .then(() => console.log('connected to database'));

const app = express();

app.use(rateLimiter);

app.use(express.json());

//Swagger API

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());

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

export { app };
