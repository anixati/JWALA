import { AccountRepo } from "./types";

export class Db {
    private static _ins: Db;
    static get Ctx(): Db {
        if (!Db._ins)
            Db._ins = new Db();
        return Db._ins;
    }
    private constructor() {
        this.Accounts = new AccountRepo();
    }
    Accounts: AccountRepo;
}
