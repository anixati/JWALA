import { Fbs } from './fbs';
import { ColRef, DocSnapshot } from './types';
import { firestore } from 'firebase';

export interface IEntity {
    id: string;
    createdBy?: string;
    createdOn?: Date;
    modifiedBy?: string;
    modifiedOn?: Date;
    disabled?: boolean;
}

export class Collection<T extends IEntity>{
    readonly _path: string;
    readonly _colref: ColRef
    readonly _toEntity= (obj: any, docsp: any):T=>{ return obj as T }
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
        return this._toEntity(obj, docsp);
    }
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
