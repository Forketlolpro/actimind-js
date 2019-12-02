export interface Subject {
    attach(observer: any): void;
    detach(observer: any): void;
    notify(): void;
}

export interface Rendereble {
    htmlElement: HTMLElement;
    render(): void;
}

export interface IHttp {
    get(url: string)
}
