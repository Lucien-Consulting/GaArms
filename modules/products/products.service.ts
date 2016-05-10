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

    addProduct(type, brand, name) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            method: 'create', 
            name: name,
            brand: brand,
            type: type
        };
        return this._http.post('./api/products.php',
            JSON.stringify(data),
            {headers: headers}
        ).map((response) => response.text());
    }

    deleteProduct(id:string) {
        return this._http.get('./api/products.php?method=delete&id=' + id)
            .map((response) => response.text());
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
        ).map((response) => response.test());
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
        ).map((response) => response.text());
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
        ).map((response) => response.text());
    }

    generateReport(id, range) {
        
    }
}

export { ProductsService };
