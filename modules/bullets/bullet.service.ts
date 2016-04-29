import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()

class BulletService {

    constructor(private _http:Http) {
    }

    getBullets() {
        return this._http.get('./api/bullets.php?method=get')
            .map((response) => response);
    }

    updateBullet(value, id) {
        let data = '?method=update' + 
                    '&newValue=' + value
                    '&id=' + id;
        return this._http.post('./api/bullets.php',
            data
        ).map((response) => response);
    }
}

export { BulletService };
