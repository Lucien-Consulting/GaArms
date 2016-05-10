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

    addBrand(name) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            method: 'create', 
            name: name
        };
        return this._http.post('./api/brands.php',
            JSON.stringify(data),
            {headers: headers}
        ).map((response) => response.text());
    }

    deleteBrand(id:string) {
        return this._http.get('./api/brands.php?method=delete&id=' + id)
            .map((response) => response.text());
    }
}

export { BrandsService };
