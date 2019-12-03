import {Rendereble} from "../Interfaces/Interfaces";

export class PaginationView implements Rendereble{
    _selector: string;
    constructor(selector: string) {
        this._selector = selector;
    }

    get selector(): string {
        return this._selector;
    }

    public render(current: number, last: number, itemsOnPage: number) {
        document.querySelector(this._selector).innerHTML = this.generateTemplate(+current, +last, +itemsOnPage);
    }

    generatePagesArrangementRef (currentPage: number, pageCount: number) {
        const delta = 2;
        let range = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
            range.push(`<a class=${currentPage===i ? 'current' : ''}>${i}</a>`);
        }
        if (currentPage - delta > 2) {
            range.unshift("<span class='dots'>. . .</span>")
        }
        if (currentPage + delta < pageCount - 1) {
            range.push("<span class='dots'>. . .</span>")
        }
        range.unshift(`<a class=${currentPage===1 ? 'current' : ''}>1</a>`);
        range.push(`<a class=${currentPage===pageCount ? 'current' : ''}>${pageCount}</a>`);
        return range.join('')
    }

    private generateTemplate(current: number, last: number, itemsOnPage: number) {
        return`

                <div class="number">${this.generatePagesArrangementRef(current, last).toString()}</div>
                <form>
                <select>
                    ${[10,20,30].map((i) => {
                        if (itemsOnPage === i ) {
                            return `<option selected value="${i}">${i}</option>`
                        }
                        return `<option value="${i}">${i}</option>`
                    })}
                </select>
                </form>`
    }
}