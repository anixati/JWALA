import { injectable } from "tsyringe";
import { RouterBase, Logger } from "../lib";

@injectable()
export class MediaRoute extends RouterBase {
    constructor(public logSvc: Logger){
        super("media");
    }
    protected register(): void {


    }
}
