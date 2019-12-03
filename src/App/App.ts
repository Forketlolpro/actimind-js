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

let headerModel =  {
    displayName: 'Title',
    displays: 'Displays',
    orders: 'Purchases',
    clicks: 'Clicks ',
    abandonedUnits: 'Abandoned Units',
    soldUnits: 'Sold units',
    revenue: 'Revenue',
    profit: 'Profit'
};

let filterModel =  {
    displays: new FilterModelItem('Displays'),
    orders:  new FilterModelItem('Purchases'),
    clicks:  new FilterModelItem('Clicks '),
    abandonedUnits:  new FilterModelItem('Abandoned Units'),
    soldUnits:  new FilterModelItem('Sold units'),
    revenue:  new FilterModelItem('Revenue'),
    profit:  new FilterModelItem('Profit')
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
        this.table.initialize(headerModel, this.paginator.currentPageData);
    }

    paginationHandler(data: any): void {
        this.table.initialize(headerModel, data)
    }

    tableHandler(data: any): void {
        //инициализмруем фильтр
        //инициализируем пагинацию
        //инициализируем табличку
        console.log(data);
    }

    filterHandler(data: any): void {
        console.log(data);
        this.paginator.initialize(data);
    }
}
