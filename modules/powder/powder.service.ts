import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()

class PowderService {

    constructor(private _http:Http) {
    }

    getPowder() {
        return this._http.get('/api/powder.php?method=get')
            .map((response) => response);
    }

    updatePowder(value, id) {
        let data = '?method=update' + 
                    '&newValue=' + value
                    '&id=' + id;
        return this._http.post('/api/bullets.php',
            data
        ).map((response) => response);
    }
}

export { PowderService };
