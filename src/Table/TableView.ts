import {Rendereble} from "../Interfaces/Interfaces";

const IMAGE_PREFIX = 'https://s3.eu-central-1.amazonaws.com/showcase-demo-images/fashion/images/';

export class TableView implements Rendereble {
    _selector: string;
    get selector(): string {
        return this._selector;
    }

    constructor(selector: string) {
        this._selector = selector;
    }

    private generateHeader(headerModel, sortingModel) {
        return Object.keys(headerModel).map(key => {
            let htmlClass = '';
            if (sortingModel.key === key) {
                htmlClass = sortingModel.direction;
            }
            return (headerModel[key].sortable) ? `<th class='${htmlClass}' data-property='${key}'> ${headerModel[key].title} </th>` : `<th> ${headerModel[key].title} </th>`;
        }).join(' ');
    }

    private generateBody(data, headerModel) {
        return data.map(row => {
            return `<tr>${Object.keys(headerModel).map(key => {
                return (key==='displayName') ? `<td>${row[key] + ' ' + row['productKey']}<img src="${IMAGE_PREFIX+row['image']}"></td>` : `<td>${row[key]}</td>`;
            }).join(' ')}</tr>`
        }).join(' ');
    }

    generateTemplate(headerModel, bodyData, sortingModel) {
        return `<table class="table table-striped table-hover">
                    <thead class="thead-light">${this.generateHeader(headerModel, sortingModel)}</thead>
                    <tbody>${this.generateBody(bodyData, headerModel)}</tbody>
                </table>`
    }

    render(headerModel, bodyModel, sortingModel) {
        document.querySelector(this._selector).innerHTML = this.generateTemplate(headerModel, bodyModel, sortingModel);
    }
}