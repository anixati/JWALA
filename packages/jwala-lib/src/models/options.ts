import { IOptions } from "./core";

//---------------------------------pages
export enum PageType {
    Home = 1,
    About,
    Contact,
    Custom
}
export interface PageOptions {
    title: string;
    description?: string;
    keywords?: Array<string>;
}
//---------------------------------menus
export enum MenuType {
    Header = 1,
    SubHeader,
    Footer,
    Page
}
export interface MenuOptions extends IOptions {
    type: MenuType;
}

//------------------------media
export enum MediaType {
    Image = 1,
    File,
    Video,
    Audio
}
export interface MediaOptions extends IOptions {
    type: MediaType;
}


//------------------------field options
