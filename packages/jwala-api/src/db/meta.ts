import { IEntity } from "jwala-lib";
import { BaseRepo } from "./fsrepo";

export interface MetaBase extends IEntity {
    name: string;
    version: number;
}

export class MetaList extends BaseRepo<MetaBase> {
	constructor(){
        super("metabase");
    }
}
