import 'reflect-metadata';
import express from "express";
import bodyParser from 'body-parser';
import { AppRouter } from './router/AppRouter';

import "./modules/users/user.controller";
import "./modules/auth/auth.controller";
import errorMiddleware from './middlewares/error.middleware';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({ limit: '1000MB' }));
app.use(express.urlencoded({ extended: false }));
app.use(AppRouter.router);
app.use(errorMiddleware);
app.listen(port, (): void => {
    console.log(`Server started on port ${port}`);
});
