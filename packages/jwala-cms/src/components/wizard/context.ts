import { createContext, useContext } from "react";


export interface IStepInfo {
    id: string;
    title: string;
    desc: string;
}
export function createWizard() {
    return {
        index: 0,
        steps: new Array<IStepInfo>(),
        get total() {
            if (this.steps !== undefined)
                return this.steps.length;
            return 0;
        },
        get statusStr() {
            return `Step ${this.index} of ${this.total}`;
        },
        get disableNext() {
            return this.index >= (this.total - 1);
        },
        get disablePrev() {
            return this.index <= 0;
        },
        get disableSave() {
            return true;
        },
        get disableComplete() {
            return true;
        },
        get progessState() {
            return `Step ${this.index + 1} of ${this.total}`;
        },
        init: function (items: Array<IStepInfo>) {
            this.steps = items;
        },
        onNext: function () {
            if (this.index >= this.total - 1) return
            this.index = this.index + 1;
        },
        onPrev: function () {
            if (this.index <= 0) return
            this.index = this.index - 1;
        },
        onComplete: function () {

        },
        get currentStep() {
            return this.steps[this.index];
        },
        isActive: function (id: string) {
            return (this.currentStep) ? this.currentStep.id === id : false;
        }
    }
}
export type wzdType = ReturnType<typeof createWizard>;
export const wzdContext = createContext<wzdType | null>(null);
export const useWzd = () => {
    const context = useContext(wzdContext);
    if (!context) {
        throw new Error('Must be used within a wzdPanel.');
    }



    return context;
};