import { Rendereble, Subject} from "../Interfaces/Interfaces";
import {ReportItem} from "../ReportItem/ReportItem";
import {generateTemplate} from "./generatePaginationTemplate";

export class Paginator implements Subject, Rendereble {
    htmlElement: HTMLElement;
    public currentPageData: ReportItem[];
    private data: ReportItem[];
    private observers: Array<any> = [];
    private itemOnPage = 2;
    private currentPage: number;
    private pagesLength: number;
    constructor(selector: HTMLElement) {
        this.htmlElement = selector;
        this.htmlElement.addEventListener('change', this.changeEventHandler.bind(this));
        this.htmlElement.addEventListener('click', this.clickEventHandler.bind(this));
    }

    private changeEventHandler (e) {
        this.itemOnPage = e.target.value;
        this.pagesLength = Math.ceil(this.data.length / this.itemOnPage);
        this.currentPage = 1;
        this.takeCurrentPageElement();
        this.render();
        this.notify();
    }

    private  clickEventHandler(e: any) {
        if (e.target.closest('.number')) {
            this.currentPage = e.target.innerHTML;
            this.takeCurrentPageElement();
            this.render();
            this.notify();
        }
    }

    private takeCurrentPageElement() {
        this.currentPageData = this.data.slice((this.currentPage - 1) * this.itemOnPage, (this.currentPage) * this.itemOnPage);
    }

    attach(observer: any): void {
        this.observers.push(observer);
    }
    detach(observer: any): void {
        const observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    }
    notify(): void {
        for (const observer of this.observers) {
            observer(this.currentPageData);
        }
    }
    initialize(data: ReportItem[]): void {
        this.data = data;
        this.pagesLength = Math.ceil(this.data.length / this.itemOnPage);
        this.currentPage = 1;
        this.render();
    }

    render(): void {
        this.htmlElement.innerHTML = generateTemplate(+this.currentPage, +this.pagesLength, +this.itemOnPage);
    }
}
