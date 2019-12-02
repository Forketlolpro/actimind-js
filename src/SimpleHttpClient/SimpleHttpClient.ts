import {IHttp} from "../Interfaces/Interfaces";

export class SimpleHttpClient implements IHttp{
    get(url: string) {
        return fetch(url)
            .then((response) => {
                response.json()
            })
            .then(json => {
                console.log(json);
            })
    }
}