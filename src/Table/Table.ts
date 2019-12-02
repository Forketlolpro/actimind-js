import {Subject} from "../Interfaces/Interfaces";
import {TableView} from "./TableView";

export class Table implements Subject {
    private observers: Array<any> = [];
    private view: TableView;
    private data: [];
    private headerModel: object;

    constructor(view: TableView) {
        this.view = view;
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

    initialize(headerModel, body) {
        this.headerModel = headerModel;
        this.data = body;
        this.show();
    }

    show(): void {
        this.view.render(this.headerModel, this.data);
    }
}
