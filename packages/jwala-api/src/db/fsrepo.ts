import { fstore, IFilter } from "./fstore";
import {IEntity,EntityPatch} from "jwala-lib"

export abstract class BaseRepo<T extends IEntity> {
    private _colName: string;
    constructor(colName: string) {
        this._colName = `${colName}`;
    }
    async getById(docId?: string): Promise<T> {
        return await fstore.ctx.getById(this._colName, docId);
    }
    async getFirst(attributes: Partial<T>): Promise<T> {
        return await fstore.ctx.getFirst(this._colName, (qb) => this.mapFilter(qb, attributes));
    }
    async list(attributes?: Partial<T>): Promise<T[]> {
        return await this.query((qb) => this.mapFilter(qb, attributes));
    }
    async query(cb: (qb: IFilter<T>) => IFilter<T>): Promise<T[]> {
        return await fstore.ctx.query(this._colName, cb);
    }
    async save(data: T | EntityPatch<T>): Promise<T> {
        return await fstore.ctx.save<any>(this._colName, data)
    }
    // private setDefaults<T>(data: T): T {
    //     const defaults = this.getDefaults<T>();
    //     if (defaults === null)
    //         return data;
    //     return { ...defaults, ...data };
    // }
    generateId() {
        return fstore.ctx.generateId();
    }
    protected mapFilter(filter: IFilter<T>, attributes?: Partial<any>): IFilter<T> {
        if (!attributes) return filter;
        return Object.keys(attributes).reduce((qry, ky) => {
            return qry.where(ky, '==', attributes[ky]);
        }, filter);
    }
    protected getDefaults<T>(): Partial<T>  {
        return {};
    }
}
