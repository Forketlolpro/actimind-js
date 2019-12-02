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

    generatePagesArrangement (current: number, last: number) {
        let delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = '',
            l;

        range.push(1)
        for (let i = current - delta; i <= current + delta; i++) {
            if (i >= left && i < right && i < last && i > 1) {
                range.push(i);
            }
        }
        range.push(last);

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots+='<a>'+ (l + 1)+'</a>';
                } else if (i - l !== 1) {
                    rangeWithDots+='<span>...</span>';
                }
            }
            if (i===current) {
                rangeWithDots+='<a class="current">'+i+'</a>';
            } else {
                rangeWithDots+='<a>'+i+'</a>';
            }
            l = i;
        }

        return rangeWithDots;
    }

    private generateTemplate(current: number, last: number, itemsOnPage: number) {
        return`

                <div class="number">${this.generatePagesArrangement(current, last).toString()}</div>
                <select>
                    ${[10,20,30].map((i) => {
                        if (itemsOnPage === i ) {
                            return `<option selected value="${i}">${i}</option>`
                        }
                        return `<option value="${i}">${i}</option>`
                    })}
                </select>
`
    }
}