export class PaginationView {
    private _selector: string;
    constructor(selector: string) {
        this._selector = selector;
    }

    get selector(): string {
        return this._selector;
    }

    public render(current: number, last: number, itemsOnPage: number) {
        document.querySelector(this._selector).innerHTML = this.generateTemplate(+current, +last, +itemsOnPage);
    }

    private generateTemplate(current: number, last: number, itemsOnPage: number) {
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
                    rangeWithDots+='<a>'+ l + 1+'</a>';
                } else if (i - l !== 1) {
                    rangeWithDots+='...';
                }
            }
            rangeWithDots+='<a>'+i+'</a>';
            l = i;
        }

        return`
            <div>
                <div class="number">${rangeWithDots.toString()}</div>
                <select>
                    ${[2,3,4].map((i) => {
                        if (itemsOnPage === i ) {
                            return `<option selected value="${i}">${i}</option>`
                        }
                        return `<option value="${i}">${i}</option>`
                    })}
                </select>
            </div>`
    }
}