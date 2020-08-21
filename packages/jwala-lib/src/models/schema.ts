import { ModelBase } from "./core";
import { FieldType } from "./fields";

export interface Schema extends ModelBase {
    title: string;
    description?: string;
    system: boolean;
    root: boolean;
    options?: any;
}

export interface Field extends ModelBase {
    schemaId: string;
    type:FieldType;
    label: string;
    description?: string;
    required: boolean;
    options?: any;
}

// maxLength?: number;
// minLength?: number;
// pattern?: string;
// required: boolean;
// unique: boolean;
// widget: string;
// default?: any;
// options?: any;