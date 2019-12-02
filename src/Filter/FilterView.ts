import {Rendereble} from "../Interfaces/Interfaces";

export class FilterView implements Rendereble {
    _selector: string;

    constructor(selector: string) {
        this._selector = selector;
    }

    render(...args: any[]): void {
        let model = args[0];
        debugger;
        document.querySelector(this._selector).innerHTML = `<div>Filter</div>`;
    }
}