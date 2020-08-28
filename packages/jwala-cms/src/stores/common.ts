import { action, observable } from "mobx";
import { Notification } from "rsuite";
import { IEntity } from "../core";
export interface IStoreBase {
    isLoading: boolean;
    loadingMsg: string;
}

export abstract class StoreBase implements IStoreBase {
    @observable isLoading = false;
    @observable loadingMsg = 'loading please wait..';
    constructor() {
    }
    @action showLoading(msg = 'loading...') {
        this.isLoading = true;
        this.loadingMsg = msg;
    }
    @action hideLoading() {
        this.isLoading = false;
        this.loadingMsg = '';
    }
    @action async process(action: () => void, msg: string) {
        this.showLoading();
        try {
            await action();
            this.showInfo(msg);
        } catch (e) {
            this.showError(e.message);
        }
        this.hideLoading();
    }
    showInfo(msg: string, title = 'Completed!') {
        Notification['info']({
            title: title,
            description: msg
        });
    }
    showError(msg: string, title = 'Process Failed!') {
        Notification['error']({
            title: title,
            description: msg
        });
    }
}

export abstract class ListBase<T extends IEntity> extends StoreBase {
    @observable items: Array<T> = new Array<T>();
    @action loadList(item: T) {
        const itm = this.items.find(x => x.id === item.id);
        if (itm)
            this.items.splice(this.items.indexOf(itm), 1);
        this.items.push(item);
    }
    @action Load = async (rxj: () => Promise<T[]>) => {
        this.showLoading();
        try {
            const list = await rxj();
            if (list) list.forEach(itm => this.loadList(itm));
        } catch (e) {
            this.showError(e.message);
        }
        this.hideLoading();
    }
}
