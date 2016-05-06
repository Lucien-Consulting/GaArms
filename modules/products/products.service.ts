import { Injectable } from 'angular2/core';
import { Headers, Http } from 'angular2/http';

@Injectable()

class ProductsService {

    constructor(private _http:Http) {
    }

    getProducts() {
        return this._http.get('./api/products.php?method=get')
            .map((response) => response.json()); 
    }

    getTypes() {
        return this._http.get('./api/products.php?method=types')
            .map((response) => response.json()); 
    }

    addProduct(product) {

    }

    deleteProduct(id:string) {
        
    }

    updateProduct(id, value, initial, quantity, type) {
        switch (type) {
            case 'Bullets':
                return this._updateBullet(id, value, initial, quantity);
                break;
            case 'Primers':
                return this._updatePrimer(id, value, initial, quantity);
                break;
            case 'Brass':
                return this._updateBrass(id, value, initial, quantity);
                break;
            case 'Powder':
                return this._updatePowder(id, value, initial, quantity);
                break;
        }
    }

    getBullets() {
        return this._http.get('./api/bullets.php?method=get')
            .map((response) => response.json());
    }

    _updateBullet(id, value, initial, quantity) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            method: 'update', 
            newValue: value,
            id: id,
            initial: initial,
            quantity: quantity
        };
        return this._http.post('./api/bullets.php',
            JSON.stringify(data),
            {headers: headers}
        ).map((response) => response);
    }

    getPowder() {
        return this._http.get('./api/powder.php?method=get')
            .map((response) => response.json());
    }

    _updatePowder(id, value, initial, quantity) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            method: 'update', 
            newValue: value,
            id: id,
            initial: initial,
            quantity: quantity
        };
        return this._http.post('./api/bullets.php',
            JSON.stringify(data),
            {headers: headers}
        ).map((response) => response);
    }

    getBrass() {
        return this._http.get('./api/brass.php?method=get')
            .map((response) => response.json());
    }

    _updateBrass(id, value, initial, quantity) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {
            method: 'update', 
            newValue: value,
            id: id,
            initial: initial,
            quantity: quantity
        };
        return this._http.post('./api/bullets.php',
            JSON.stringify(data),
            {headers: headers}
        ).map((response) => response);
    }

    getPrimers() {
        return this._http.get('./api/primers.php?method=get')
            .map((response) => response.json());
    }

    _updatePrimer(id, value, initial, quantity) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            method: 'update', 
            newValue: value,
            id: id,
            initial: initial,
            quantity: quantity
        };
        return this._http.post('./api/primers.php',
            JSON.stringify(data),
            {headers: headers}
        ).map((response) => response);
    }
}

export { ProductsService };
