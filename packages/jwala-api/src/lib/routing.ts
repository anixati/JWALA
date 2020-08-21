import express, { Router, Request, Response, NextFunction } from "express";
import { container, InjectionToken } from "tsyringe";

const wrapAsyncFn = (fn: express.RequestHandler) =>
(req: Request, res: Response, nxt: NextFunction) => Promise.resolve(fn(req, res, nxt)).catch(nxt)

export abstract class RouterBase {
    private readonly _path: string;
    private readonly _router: Router;
    constructor(path: string) {
        this._path = path;
        this._router = Router();
        this.register();
    }
    get routePath(): string {
        return `/${this._path}`;
    }
    get router() {
        return this._router;
    }
    protected abstract register(): void;
    protected onGet(route: string, handler: (request: Request) => Promise<void | any>) {
        this._router.get(`/${route}`,wrapAsyncFn(async (request: Request, response: Response) => {
            await this.execute(request, response, handler);
        }));
    }
    protected onPost(route: string, handler: (request: Request) => Promise<void | any>) {
        this._router.post(route,wrapAsyncFn(async (request: Request, response: Response) => {
            await this.execute(request, response, handler);
        }));
    }
    async execute(req: Request, res: Response, handler: (req: Request) => Promise<void | any>) {
        try {
            const result = await handler(req);
            if (result)
                res.status(200).json(result);
            res.status(200);
        }
        catch (e) {
            res.status(500).json({ "Error": (<Error>e).message });
        }
        finally {
            res.end();
        }
    }
    protected resolve<T>(token:InjectionToken<T>): T {
        return container.resolve<T>(token);
    }
}