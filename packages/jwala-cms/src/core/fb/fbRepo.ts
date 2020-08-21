import { Fbs } from './fbs';
import { ColRef, DocSnapshot } from './types';
import { firestore } from 'firebase';

export abstract class Entity {
    public id: string = '';
    public createdBy?: string;
    public createdOn?: Date;
    public modifiedBy?: string;
    public modifiedOn?: Date;
    public disabled?: boolean;
    public get lastModified(): string {
        return `${this.modifiedOn!.toISOString()}`;
    }
}

export abstract class Repository<T extends Entity>{
    readonly _path: string;
    readonly _colref: ColRef
    constructor(path: string) {
        this._path = path;
        this._colref = Fbs.ctx.Store.collection(this._path);
    }
    public async List(): Promise<T[]> {
        const snapshot = await this._colref.get()
        return snapshot.docs.map((sp) => this.fromFirestore(sp))
    }
    public async create(item: T): Promise<T | null> {
        const rx = this.clone({ ...item, ...this._addAuditHdr });
        const result = await this._colref.add(rx.data)
        const docsp = await result.get();
        if (!docsp.exists)
            return null;
        return this.fromFirestore(docsp);
    }
    private fromFirestore(docsp: DocSnapshot): T {
        const sobj = {...docsp.data()};
        delete sobj.createdOn;
        delete sobj.modifiedOn;
        const obj = {
            id: docsp.id,
            createdOn: this.AsDate(docsp.data()!.createdOn),
            modifiedOn: this.AsDate(docsp.data()!.modifiedOn),
            ...sobj
        };
        return this.toEntity(obj, docsp);
    }
    abstract toEntity(obj: any, docsp: any): T;
    private clone(data: T): { id: string, data: any } {
        const obj = Object.assign({}, data);
        const id = data.id;
        delete obj.id;
        return {
            id: id,
            data: obj
        };
    }
    private get _addAuditHdr() {
        const user = Fbs.ctx.UserId;
        const date = new Date();
        return { createdBy: user, createdOn: date, modifiedBy: user, modifiedOn: date, disabled: false };
    }
    private AsDate(ts: firestore.Timestamp | undefined): (Date | null) {
        if (ts !== undefined) {
            return new Date(ts.toMillis());
        }
        return null;
    }
    private get _setAuditHdr() {
        const user = Fbs.ctx.UserId;
        const date = new Date();
        return { modifiedBy: user, modifiedOn: date };
    }
}
