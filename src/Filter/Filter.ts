import { Subject} from "../Interfaces/Interfaces";
import {FilterView} from "./FilterView";

export class Filter implements Subject {
    private observers: Array<any> = [];
    private view: FilterView;
    private data: any;
    private filterModel: any;
    constructor(view: FilterView) {
        this.view = view;
    }

    initialize(data, model) {
        this.filterModel = model;
        this.data = data;
        this.calculateRange();
        this.show();
    }

    attach(observer: any): void {
        this.observers.push(observer);
    }

    detach(observer: any): void {
        const observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    }

    notify(): void {
        for (const observer of this.observers) {
            observer(this);
        }
    }

    show(): void {
        this.view.render(this.filterModel);
    }

    private filter() {

    }

    private calculateRange() {
        this.data.map(item=> {
            Object.keys(this.filterModel).map(key => {
                if(item[key] > this.filterModel[key].max) {
                    this.filterModel[key].max = item[key]
                }

                if(item[key] < this.filterModel[key].max) {
                    this.filterModel[key].min = item[key]
                }
            })
        })
    }
}
