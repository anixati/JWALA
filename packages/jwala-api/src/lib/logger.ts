import { singleton } from "tsyringe";

@singleton()
export class Logger {
    constructor() {
        //this.logger = this.SetupLogger();
    }
    Error = (message: string, logItem: any = {}) => {
        console.log(`ERR-> ${message}`);
    }
    Info = (message: string, logItem: any = {}) => {
        console.log(`INF-> ${message}`);
    }
    Warn = (message: string, logItem: any = {}) => {
        console.log(`WRN-> ${message}`);
    }
}

