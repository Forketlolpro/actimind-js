import {Rendereble} from "../Interfaces/Interfaces";

export class TableView implements Rendereble{
    _selector: string;
    get selector(): string {
        return this._selector;
    }

    constructor(selector: string) {
        this._selector = selector;
    }

    private generateHeader(headerModel) {
        let headers = '';
        Object.values(headerModel).map(i=>{
            headers+= `<th> ${i} </th>`
        });

        return headers;
    }

    private generateBody(data, headerModel) {
        let body = '';
        data.map(row => {
            body+=`<tr>${Object.keys(headerModel).map(key =>{
                if (key === 'displayName') {
                    return `<td>${row[key]+' '+row['productKey']}</td>`
                } else {
                    return `<td>${row[key]}</td>`
                }
            })}</tr>`
        });

        return body;
    }

    generateTemplate(headerModel, bodyData) {
        return `<table>
                    <thead>${this.generateHeader(headerModel)}</thead>
                    <tbody>${this.generateBody(bodyData, headerModel)}</tbody>
                </table>`
    }

    render(headerModel, bodyModel) {
        document.querySelector(this._selector).innerHTML = this.generateTemplate(headerModel, bodyModel);
    }
}