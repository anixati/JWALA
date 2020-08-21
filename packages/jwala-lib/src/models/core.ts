

export interface IEntity {
    id?: string;
    code?: string;
    createdOn?: Date;
    modifiedOn?: Date;
}
export type EntityPatch<T> = { id: string } & Partial<T>;

export interface ModelBase extends IEntity {
    disabled?: boolean;
    deleted?: boolean;
}

export interface IOptions {
    name: string;
}