


export enum FieldType {
    text = 1, 
    note,
    number,
    email,
    password,
    dateTime,
    flag,
    optionList,
    lookup,
    media,
    markdown,
    mdx,
    hidden,
    json
}

export interface FieldInfo {
    name: string;
}
export const FieldList : Record<string, Partial<FieldInfo>> = {
    "p2": { name: "SiteCollection" }
 };
