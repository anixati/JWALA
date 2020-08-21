import { Entity, Repository } from "../core";
import { plainToClass } from 'class-transformer';

//-----------------------Account----------------------
export class Account extends Entity{
    public Name: string = '';
    public Description?: string;
    public constructor(init?: Partial<Account>) {
        super();
        Object.assign(this, init);
    }
}

export class AccountRepo extends Repository<Account> {
    constructor() {
        super('jw_accounts');
    }
    toEntity(obj: any, docsp: any): Account {
        return plainToClass(Account, obj) as unknown as Account;
    }
}
