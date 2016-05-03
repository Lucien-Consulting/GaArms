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

    getBullets() {
        return this._http.get('./api/bullets.php?method=get')
            .map((response) => response.json());
    }

    updateBullet(value, id) {
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

    getPrimers() {
        return this._http.get('./api/primers.php?method=get')
            .map((response) => response.json());
    }

    updatePrimer(value, id) {
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
