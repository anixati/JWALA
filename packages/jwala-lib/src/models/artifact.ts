import { ModelBase } from "./core";

//-------------------------------------types----------------------------------

export enum FlowState {
    draft = 1, //--page
    review,
    scheduled,
    published,
    reverted,
    archived
}
export enum ArtifactType {
    page = 1, 
    template,
    folder,
    media,
    menu,
    library
}
//-----------------------------------------------------------------------

export interface Artifact extends ModelBase {
    siteId: string;
    schemaId: string;
    version: number;
    title: string;
    type: ArtifactType;
    isSystem:boolean;
    isCollection: boolean;
    state:FlowState,
    description?: string;
    parentId?: string;
    options?: any,
    slug?: string;
    locked?:boolean;
    publishedOn?: Date;
    items?: Array<string>;
}

export interface ArtifactItem extends ModelBase {
    artifactId: string;
    fieldId: string;
    order: number;
    title: string;
    description?: string;
    content?: any;
}