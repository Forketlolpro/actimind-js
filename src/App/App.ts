import {ReportItem} from "../ReportItem/ReportItem";
import {Paginator} from "../Pagination/Pagination";
import {Table} from "../Table/Table";
import {Filter} from "../Filter/Filter";
import {SimpleHttpClient} from "../SimpleHttpClient/SimpleHttpClient";
import {PaginationView} from "../Pagination/PaginationView";
import {TableView} from "../Table/TableView";

let json = require('../assets/product-data.json');

let headerModel =  {
    displayName: 'Title',
    displays: 'Displays',
    clicks: 'Clicks ',
    abandonedUnits: 'Abandoned Units',
    soldUnits: 'Sold units',
    revenue: 'Revenue',
    profit: 'Profit'
};

export class App {
    private data: ReportItem[];
    private paginator: Paginator;
    private table: Table;
    private filter: Filter;
    private http: SimpleHttpClient;
    constructor() {
        this.paginator = new Paginator(new PaginationView('.paginator'));
        this.paginator.initialize(json);
        this.paginator.attach(this.paginationHandler.bind(this));

        this.table = new Table(new TableView('.table'));
        this.table.initialize(headerModel, this.paginator.currentPageData)
    }

    paginationHandler(data: any): void {
        this.table.initialize(headerModel, data)
    }
}
