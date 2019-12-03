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
                      return `<div><label>${item[1]['title']}: </label>
                                <input class="form-control" data-use="min" data-property="${item[0]}" value="${item[1]['min']}" type="number">
                                <input class="form-control" data-use="max" data-property="${item[0]}" value="${item[1]['max']}" type="number">
                            </div>`  
                    }).join(' ')}
                    <button class="btn btn-primary"type="submit">Apply</button>
                </form>`
    }

    generateTemplate(model) {
        return `<h2>Filters</h2>${this.generateFilterForm(model)}`
    }

    render(...args: any[]): void {
        let model = args[0];
        document.querySelector(this._selector).innerHTML = this.generateTemplate(model);
    }
}