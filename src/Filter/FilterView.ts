import {Rendereble} from "../Interfaces/Interfaces";

export class FilterView implements Rendereble {
    _selector: string;

    get selector(): string {
        return this._selector;
    }

    constructor(selector: string) {
        this._selector = selector;
    }

    generateFilterForm(model) {
        return `<form>
                    ${Object.entries(model).map((item) => {
                      return `<div><lable>${item[1]['title']}: </lable><input data-use="min" data-property="${item[0]}" value="${item[1]['min']}" type="number"><input data-use="max" data-property="${item[0]}" value="${item[1]['max']}" type="number"></div>`  
                    }).join(' ')}
                    <button type="submit">Apply</button>
                </form>`
    }

    generateTemplate(model) {
        return `<h1>Filters</h1>${this.generateFilterForm(model)}`
    }

    render(...args: any[]): void {
        let model = args[0];
        document.querySelector(this._selector).innerHTML = this.generateTemplate(model);
    }
}