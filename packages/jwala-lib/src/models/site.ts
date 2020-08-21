import { ModelBase } from "./core";

//---------------------------Project------------------------------------
export interface Project extends ModelBase {
    name?: string;
    description?: string;
}
//---------------------------site------------------------------------
export enum SiteType {
    default = 1,
    trial,// --free
    premium//--paid
}
export interface Site extends ModelBase {
    projectId?: string;
    type?: SiteType;
    name?: string;
    description?: string;
}