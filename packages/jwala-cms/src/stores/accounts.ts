import { action } from "mobx";
import { Account, Accounts } from "../entities";
import { ListBase } from "./common";

//---------------------------------------------------

export class AccountStore extends ListBase<Account> {
    private _accounts: Accounts;
    constructor() {
        super();
        this._accounts= new Accounts();
    }
    @action addAccount = (item: any) => {
        this.process(() => {
            this._accounts.create(item);
            this.loadAccounts();
        }, 'Created new Account')
    }
    @action loadAccounts = async () => {
        await this.Load(async () => await this._accounts.List());
    }
}