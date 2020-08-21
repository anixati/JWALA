import { singleton } from "tsyringe";
import { Logger } from "../lib";
import { MetaList } from "../db/meta";


@singleton()
export class SetupService {

    constructor(public logSvc: Logger) {
    }
    async initialize() {
        let rval: { [k: string]: any } = {};
        try {
            const solution = require('../data.json');
            const sol = await this.ensureSoln(solution);


            rval.status = `Applied sucessfully solution: ${JSON.stringify(sol)}!`;
        } catch (ex) {
            this.logSvc.Error(ex);
            rval.status = `Failed to apply solution! ${(<Error>ex).message}`;
        }
        return rval;
    }

    private async ensureSoln(solution: any) {
        if (!solution || Object.keys(solution).length === 0)
            throw new Error("no solution data found");
        const mr = new MetaList();
        const ms = { name: solution.name, version: solution.version };
        const def = await mr.getFirst(ms);
        console.log('*', def);
        if (def)
            throw new Error("solution already applied!");
        const nsol = await mr.save(ms);
        return nsol;
    }
}