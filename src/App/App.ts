import {ReportItem} from "../ReportItem/ReportItem";
import {Paginator} from "../Pagination/Pagination";
import {Table} from "../Table/Table";
import {Filter} from "../Filter/Filter";

export class App {
    private data: ReportItem[];
    private paginator: Paginator;
    private table: Table;
    private filter: Filter;
    constructor() {
        this.data = [
            new ReportItem('Ilya', 0, 'Fsorket', 3),
            new ReportItem('Ilyas', 1, 'Dorkdet', 2),
            new ReportItem('Flya', 2, 'Porkdet', 1),
            new ReportItem('Flya', 3, 'Porkdet', 1),
            new ReportItem('Flya', 4, 'Porkdet', 1),
            new ReportItem('Flya', 5, 'Porkdet', 1),
            new ReportItem('Flya', 6, 'Porkdet', 1),
            new ReportItem('Flya', 7, 'Porkdet', 1),
            new ReportItem('Flya', 8, 'Porkdet', 1),
            new ReportItem('Flya', 9, 'Porkdet', 1),
            new ReportItem('Ilya', 10, 'Fsorket', 3),
            new ReportItem('Ilyas', 11, 'Dorkdet', 2),
            new ReportItem('Flya', 12, 'Porkdet', 1),
            new ReportItem('Flya', 13, 'Porkdet', 1),
            new ReportItem('Flya', 14, 'Porkdet', 1),
            new ReportItem('Flya', 15, 'Porkdet', 1),
            new ReportItem('Flya', 16, 'Porkdet', 1),
            new ReportItem('Flya', 17, 'Porkdet', 1),
            new ReportItem('Flya', 18, 'Porkdet', 1),
            new ReportItem('Flya', 19, 'Porkdet', 1),
            new ReportItem('Ilya', 20, 'Fsorket', 3),
            new ReportItem('Ilyas', 21, 'Dorkdet', 2),
            new ReportItem('Flya', 22, 'Porkdet', 1),
            new ReportItem('Flya', 23, 'Porkdet', 1),
            new ReportItem('Flya', 24, 'Porkdet', 1),
            new ReportItem('Flya', 25, 'Porkdet', 1),
            new ReportItem('Flya', 26, 'Porkdet', 1),
            new ReportItem('Flya', 27, 'Porkdet', 1),
            new ReportItem('Flya', 28, 'Porkdet', 1),
            new ReportItem('Flya', 29, 'Porkdet', 1),
            new ReportItem('Ilya', 30, 'Fsorket', 3),
            new ReportItem('Ilyas', 31, 'Dorkdet', 2),
            new ReportItem('Flya', 32, 'Porkdet', 1),
            new ReportItem('Flya', 33, 'Porkdet', 1),
            new ReportItem('Flya', 34, 'Porkdet', 1),
            new ReportItem('Flya', 35, 'Porkdet', 1),
            new ReportItem('Flya', 36, 'Porkdet', 1),
            new ReportItem('Flya', 37, 'Porkdet', 1),
            new ReportItem('Flya', 38, 'Porkdet', 1),
            new ReportItem('Flya', 39, 'Porkdet', 1),
        ];
        this.paginator = new Paginator(document.querySelector('.paginator'));
        this.paginator.initialize(this.data);
        this.paginator.attach(this.paginationHandler);
    }

    paginationHandler(data: any): void {
        console.log(data)
    }
}
