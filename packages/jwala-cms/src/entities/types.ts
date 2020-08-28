import { IEntity, Collection } from "../core";
//import { plainToClass } from 'class-transformer';

//-----------------------Account----------------------
export interface Account extends IEntity{
    name: string;
    description?: string;
}

export class Accounts extends Collection<Account>{
    constructor() {
        super('jw_accounts')
    }
    // toEntity(obj: any, docsp: any): Account {
    //     return plainToClass(Account, obj) as unknown as Account;
    // }
}
