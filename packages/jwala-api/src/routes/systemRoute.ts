import { injectable } from "tsyringe";
import { RouterBase, Logger } from "../lib";
import  {Request} from "express";
import { SetupService } from "../services/setupService";

@injectable()
export class SystemRoute extends RouterBase {
    constructor(public logSvc: Logger,public setupSvc:SetupService) {
        super("system");
    }
    protected register(): void {
        this.onGet("setup", async (rq: Request) => {
            return await this.setupSvc.initialize();
        });
    }

}
