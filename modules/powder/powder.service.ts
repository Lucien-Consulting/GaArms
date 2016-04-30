import { Injectable } from 'angular2/core';
import { Headers, Http } from 'angular2/http';

@Injectable()

class PowderService {

    constructor(private _http:Http) {
    }

    getPowder() {
        return this._http.get('./api/powder.php?method=get')
            .map((response) => response.json());
    }

    updatePowder(value, id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            method: 'update', 
            newValue: value,
            id: id
        };
        return this._http.post('./api/bullets.php',
            JSON.stringify(data),
            {headers: headers}
        ).map((response) => response.json());
    }
}

export { PowderService };
