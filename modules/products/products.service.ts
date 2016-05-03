import { Injectable } from 'angular2/core';
import { Headers, Http } from 'angular2/http';

@Injectable()

class ProductsService {

    constructor(private _http:Http) {
    }

    addProduct(product) {

    }

    deleteProduct(id:string) {
        
    }

    updateProduct(id, value, type) {
        switch (type) {
            case 'Bullets':
                return this._updateBullet(id, value);
                break;
            case 'Primers':
                return this._updatePrimer(id, value);
                break;
            case 'Brass':
                return this._updateBrass(id, value);
                break;
            case 'Powder':
                return this._updatePowder(id, value);
                break;
        }
    }

    getBullets() {
        return this._http.get('./api/bullets.php?method=get')
            .map((response) => response.json());
    }

    _updateBullet(id, value) {
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

    getPowder() {
        return this._http.get('./api/powder.php?method=get')
            .map((response) => response.json());
    }

    _updatePowder(id, value) {
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

    getBrass() {
        return this._http.get('./api/brass.php?method=get')
            .map((response) => response.json());
    }

    _updateBrass(id, value) {
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

    getPrimers() {
        return this._http.get('./api/primers.php?method=get')
            .map((response) => response.json());
    }

    _updatePrimer(id, value) {
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

export { ProductsService };
