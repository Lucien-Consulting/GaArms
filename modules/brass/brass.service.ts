import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()

class BrassService {

    constructor(private _http:Http) {
    }

    getBrass() {
        return this._http.get('/api/brass.php?method=get')
            .map((response) => response);
    }

    updateBrass(value, id) {
        let data = '?method=update' + 
                    '&newValue=' + value
                    '&id=' + id;
        return this._http.post('/api/bullets.php',
            data
        ).map((response) => response);
    }
}

export { BrassService };
