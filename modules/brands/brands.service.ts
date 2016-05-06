import { Injectable } from 'angular2/core';
import { Headers, Http } from 'angular2/http';

@Injectable()

class BrandsService {

    constructor(private _http:Http) {
    }

    getBrands() {
        return this._http.get('./api/brands.php?method=get')
            .map((response) => response.json());
    }
}

export { BrandsService };
