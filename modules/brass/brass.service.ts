import { Injectable } from 'angular2/core';
import { Headers, Http } from 'angular2/http';

@Injectable()

class BrassService {

    constructor(private _http:Http) {
    }

    getBrass() {
        return this._http.get('./api/brass.php?method=get')
            .map((response) => response.json());
    }

    updateBrass(value, id) {
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

export { BrassService };
