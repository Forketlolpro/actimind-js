import {Subject} from "../Interfaces/Interfaces";
import {FilterView} from "./FilterView";

export class Filter implements Subject {
    public filteredData: [];
    private observers: Array<any> = [];
    private view: FilterView;
    private data: any;
    private filterModel: any;

    constructor(view: FilterView) {
        this.view = view;
        document.querySelector(this.view._selector).addEventListener('submit', this.submitEventHandler.bind(this));
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
            observer(this.filteredData);
        }
    }

    submitEventHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        for (let i = 0; i < e.target.length - 1; i++) {
            if (e.target[i].dataset['use'] === 'min') {
                this.filterModel[e.target[i].dataset['property']].selectMin = +e.target[i].value;
            } else {
                this.filterModel[e.target[i].dataset['property']].selectMax = +e.target[i].value;
            }
        }
        this.filter();
        this.notify();
    }

    show(): void {
        this.view.render(this.filterModel);
    }

    private filter() {
        let self = this;
        this.filteredData = this.data.filter(item => {
            return Object.keys(this.filterModel).every(key => {
                return (item[key] <= self.filterModel[key].selectMax) && (item[key] >= self.filterModel[key].selectMin);
            });
        });
    }

    private calculateRange() {
        this.data.forEach(item => {
            Object.keys(this.filterModel).forEach(key => {
                if (item[key] > this.filterModel[key].max) {
                    this.filterModel[key].max = item[key]
                }

                if (item[key] < this.filterModel[key].min) {
                    this.filterModel[key].min = item[key]
                }
            })
        })
    }
}
