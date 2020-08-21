import { Request, Response, NextFunction } from "express";
import cors from "cors";
import express from 'express';
import { singleton } from "tsyringe";
import {router} from "../routes/router"
import { Logger, Exception } from "../lib";

@singleton()
export class ApiService {
    private app: express.Application;
    constructor(public logSvc: Logger) {
        let exp = express();
        exp.disable("x-powered-by");
        exp.use(cors({ origin: true }));
        this.app = exp;
    }

    public Create(): express.Application {
        
        //setup routing ------------
        const handlers = router.getRoutes();
        handlers.forEach(handler => {
            this.app.use(handler.routePath,handler.router)
        });
      

        //Error Handling -----------
        this.app.use((err: Exception, rq: Request, rs: Response, nx: NextFunction) => {
            const code = err.statusCode || 500;
            const message = err.message || "Unhandled Exception";
            this.logSvc.Error(message, err);
            rs.status(code).json({ status: "API-ERROR", statusCode: code, message: message });
        });
        //Not found ------------
        this.app.use((rq: Request, rs: Response, nx: NextFunction) => {
            rs.status(404).json({ message: "Not found! :-(" });
        });
        return this.app;
    }
}
