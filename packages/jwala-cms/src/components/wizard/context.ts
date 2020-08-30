import { createContext, useContext } from "react";

export interface IStepInfo {
    id: number;
    title: string;
}
export interface IStepObj {
    canNext: () => Promise<boolean>;
    submit: (values: any) => Promise<any>;
    reset: () => void;
    schema: () => any;
}

export function createWizard() {
    return {
        index: 0,
        steps: new Array<IStepInfo>(),
        hasError: false,
        get total() {
            if (this.steps !== undefined)
                return this.steps.length;
            return 0;
        },
        get statusStr() {
            return `Step ${this.index} of ${this.total}`;
        },
        get disableNext() {
            return this.index >= (this.total - 2);
        },
        get disablePrev() {
            return this.isCompleted ? true : this.index <= 0;
        },
        get disableSave() {
            return true;
        },
        get progessState() {
            return `Step ${this.index + 1} of ${this.total}`;
        },
        init: function (items: Array<IStepInfo>) {
            this.steps = items.concat([{ id: 998, title: 'Summary' }, { id: 999, title: 'Done' }]);
        },
        onNext: function () {
            if (this.index >= this.total) return
            this.hasError = false;
            this.index = this.index + 1;
        },
        setError: function () {
            this.hasError = true;
        },
        onPrev: function () {
            if (this.index <= 0) return
            this.hasError = false;
            this.index = this.index - 1;
        },
        onComplete: function () {
            if (!this.isSummary) return
            this.index = this.index + 1;
        },
        get currentStep() {
            return this.steps[this.index];
        },
        isActive: function (id: number) {
            return (this.currentStep) ? this.currentStep.id === id : false;
        },
        get isForms() {
            return this.index >= 0 && this.index <= (this.total - 3);
        },
        get isSummary() {
            return this.index === (this.total - 2);
        },
        get isCompleted() {
            return this.index == (this.total - 1);
        },
        get currentStatus() {
            return this.hasError ? "error" : "process";;
        },
    }
}

export const wzdContext = createContext<ReturnType<typeof createWizard> | null>(null);
export const useWzd = () => {
    const context = useContext(wzdContext);
    if (!context)
        throw new Error('Must be used within a wzdPanel.');
    return context;
};