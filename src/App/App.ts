import {ReportItem} from "../ReportItem/ReportItem";
import {Paginator} from "../Pagination/Pagination";
import {Table} from "../Table/Table";
import {Filter} from "../Filter/Filter";
import {SimpleHttpClient} from "../SimpleHttpClient/SimpleHttpClient";
import {PaginationView} from "../Pagination/PaginationView";
import {TableView} from "../Table/TableView";
import {FilterView} from "../Filter/FilterView";
import {FilterModelItem} from "../Filter/FilterModelItem";
import {HeaderModelItem} from "../Table/HeaderModelItem";
import {simulateAsyncRequest} from "../helpers/simulateAsyncRequest";

let headerModel = {
    image: new HeaderModelItem('', false),
    displayName: new HeaderModelItem('Title', false),
    displays: new HeaderModelItem('Displays', true),
    orders: new HeaderModelItem('Purchase', true),
    clicks: new HeaderModelItem('Clicks', true),
    abandonedUnits: new HeaderModelItem('Abandoned Units', true),
    soldUnits: new HeaderModelItem('Sold units', true),
    revenue: new HeaderModelItem('Revenue', true),
    profit: new HeaderModelItem('Profit', true)
};

let filterModel = {
    displays: new FilterModelItem('Displays'),
    orders: new FilterModelItem('Purchases'),
    clicks: new FilterModelItem('Clicks '),
    abandonedUnits: new FilterModelItem('Abandoned Units'),
    soldUnits: new FilterModelItem('Sold units'),
    revenue: new FilterModelItem('Revenue'),
    profit: new FilterModelItem('Profit')
};

export class App {
    private data: ReportItem[];
    private paginator: Paginator;
    private table: Table;
    private filter: Filter;
    private http: SimpleHttpClient;

    constructor() {
        simulateAsyncRequest().then(json=>{
            this.filter = new Filter(new FilterView('.filter'));
            this.filter.initialize(json, filterModel);
            this.filter.attach(this.filterHandler.bind(this));

            this.paginator = new Paginator(new PaginationView('.paginator'));
            this.paginator.initialize(json);
            this.paginator.attach(this.paginationHandler.bind(this));

            this.table = new Table(new TableView('.table'));
            this.table.attach(this.tableHandler.bind(this));
            this.table.initialize(headerModel, this.paginator.currentPageData, json);
        });
    }

    paginationHandler(currentPageData: any): void {
        this.table.initialize(headerModel, currentPageData)
    }

    tableHandler(data: any): void {
        this.paginator.initialize(data);
        this.table.initialize(headerModel, this.paginator.currentPageData);
    }

    filterHandler(data: any): void {
        this.paginator.initialize(data);
        this.table.initialize(headerModel, this.paginator.currentPageData, data);
    }
}
