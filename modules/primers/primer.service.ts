import { Injectable } from 'angular2/core';
import { Headers, Http } from 'angular2/http';

@Injectable()

class PrimerService {

    constructor(private _http:Http) {
    }

    getPrimers() {
        return this._http.get('./api/primers.php?method=get')
            .map((response) => response.json());
    }

    updatePrimer(value, id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            method: 'update', 
            newValue: value,
            id: id
        };
        return this._http.post('./api/primers.php',
            JSON.stringify(data),
            {headers: headers}
        ).map((response) => response.json());
    }
}

export { PrimerService };
