import {ReportItem} from "../ReportItem/ReportItem";
import {Paginator} from "../Pagination/Pagination";
import {Table} from "../Table/Table";
import {Filter} from "../Filter/Filter";
import {SimpleHttpClient} from "../SimpleHttpClient/SimpleHttpClient";
import {PaginationView} from "../Pagination/PaginationView";
import {TableView} from "../Table/TableView";
import {FilterView} from "../Filter/FilterView";
import {FilterModelItem} from "../Filter/FilterModelItem";

let json = require('../assets/product-data2.json');

let headerModel = {
    displayName: {
        title: 'Title',
        sortable: false,
    },
    displays: {
        title: 'Displays',
        sortable: true,
    },
    orders: {
        title: 'Purchase',
        sortable: true,
    },
    clicks: {
        title: 'Clicks',
        sortable: true,
    },
    abandonedUnits: {
        title: 'Abandoned Units',
        sortable: true,
    },
    soldUnits: {
        title: 'Sold units',
        sortable: true,
    },
    revenue: {
        title: 'Revenue',
        sortable: true,
    },
    profit: {
        title: 'Profit',
        sortable: true,
    },
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
        this.filter = new Filter(new FilterView('.filter'));
        this.filter.initialize(json, filterModel);
        this.filter.attach(this.filterHandler.bind(this));

        this.paginator = new Paginator(new PaginationView('.paginator'));
        this.paginator.initialize(json);
        this.paginator.attach(this.paginationHandler.bind(this));

        this.table = new Table(new TableView('.table'));
        this.table.attach(this.tableHandler.bind(this));
        this.table.initialize(headerModel, this.paginator.currentPageData, json);
    }

    paginationHandler(currentPageData: any): void {
        console.log('Pagi handler');
        this.table.initialize(headerModel, currentPageData)
    }

    tableHandler(data: any): void {
        console.log('Table handler');
        this.paginator.initialize(data);
        this.table.initialize(headerModel, this.paginator.currentPageData);
    }

    filterHandler(data: any): void {
        console.log('Filter handler');
        this.paginator.initialize(data);
        this.table.initialize(headerModel, this.paginator.currentPageData, data);
    }
}
