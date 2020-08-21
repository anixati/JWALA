import { action } from "mobx";
import { Db, Account } from "../entities";
import { ListBase } from "./common";

//---------------------------------------------------

export class AccountStore extends ListBase<Account> {
    constructor() {
        super();
    }
    @action addAccount = (item: any) => {
        this.process(() => {
            Db.Ctx.Accounts.create(item);
            this.loadAccounts();
        }, 'Created new Account')
    }
    @action loadAccounts = async () => {
        await this.Load(async () => await Db.Ctx.Accounts.List());
    }
}