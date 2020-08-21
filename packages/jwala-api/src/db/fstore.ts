import {IEntity} from "jwala-lib"
import admin, { firestore } from "firebase-admin";

export type OrderDirection = 'desc' | 'asc';
export type Operator = '==' | '<' | '<=' | '>' | '>=' | 'in';
export interface IFilter<T> {
    where(field: string, operator: Operator, value: any): IFilter<T>
    limit(limit: number): IFilter<T>;
    offset(offset: number): IFilter<T>;
    orderBy(property: string, direction?: OrderDirection): IFilter<T>;
    get(): Promise<any>;
    onSnapshot(onNext: (snapshot: any) => void, onError?: (error: Error) => void): () => void;
}


export class fstore {
    private _initFlag: boolean;
    private static _ins: fstore;
    private _db: firestore.Firestore;
    private constructor() {
        this._db = admin.firestore();
        this._db.settings({
            timestampsInSnapshots: true,
            host: "localhost:5091",
            ssl: false
        });
        this._initFlag = false;
    }
    static get ctx(): fstore {
        if (!fstore._ins)
            fstore._ins = new fstore();
        return fstore._ins;
    }
    public get AppId() {
        return `jwala11`;
    }
    public get Db() {
        return this._db;
    }
    initialize() {
        if (this._initFlag) return;
        console.log('firestore Ok!');
        this._initFlag = true;
    }

    async getById<T = any>(colName: string, docId?: string) {
        if (docId === undefined)
            return null;
        return await this.getDocument(this.getDocRef(colName, docId));
    }

    async getFirst<T = any>(colName: string, cb: (qb: IFilter<T>) => IFilter<T>) {
        const result = await this.query(colName, (qb) => {
            return cb(qb).limit(1);
        });
        return result[0] || null;
    }

    async save<T = any>(colName: string, data: any, merge = false) {
        const model = fstore.clone(data);
        if (!model.id)
            return this.intAdd(colName, model.data)
        return this.intUpdate(colName, model.id, model.data, merge);
    }

    async query<T = any>(colName: string, cb?: (qb: IFilter<T>) => IFilter<T>) {
        const qb = this._db.collection(colName);
        const query = cb ? cb(qb) : qb;
        const result: FirebaseFirestore.QuerySnapshot = await query.get();
        return (result.empty) ? [] :
            result.docs.map(doc => fstore.format(doc));
    }
    generateId(): string {
        return this._db.collection('').doc().id;
    }
    //-------------------------- Privates------------------------ 

    private async intAdd(colName: string, data: any): Promise<any> {
        const docRef = await this._db.collection(colName).add(data);
        return await this.getDocument(docRef);
    }

    private async intUpdate(colName: string, docId: string, data: any, merge = false) {
        const docRef = this.getDocRef(colName, docId);
        await docRef.set(data, { merge });
        return await this.getDocument(docRef);
    }

    private getDocRef = (colName: string, docId: string) => this._db.doc(fstore.getPath(colName, docId));
    private async getDocument(docRef: firestore.DocumentReference<firestore.DocumentData>) {
        const model = await docRef.get();
        return fstore.format(model);
    }
    //-------------------------- statics------------------------ 
    static fieldValue = () => admin.firestore.FieldValue;
    static getPath = (colName: string, docId: string) => `${colName}/${docId}`;
    private static clone(data: IEntity): { id?: string, data: any } {
        const clone = Object.assign({}, data);
        const id = data.id;
        delete clone.id;
        delete clone.createdOn;
        delete clone.modifiedOn;
        return {
            id: id,
            data: clone
        };
    }

    private static format(snapshot: FirebaseFirestore.DocumentSnapshot) {
        if (!snapshot.exists)
            return null;
        return Object.assign({
            id: snapshot.id,
            createdOn: fstore.AsDate(snapshot.createTime),
            modifiedOn: fstore.AsDate(snapshot.updateTime)
        }, snapshot.data()) as any;
    }
    static AsDate(ts: firestore.Timestamp | undefined): (Date | null) {
        if (ts !== undefined)
            return new Date(ts.toMillis());
        return null;
    }
}