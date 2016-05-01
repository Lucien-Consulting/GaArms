// this is the overarching builder component
import { Component, OnInit } from 'angular2/core';
import { LoginComponent } from '../login/login.component';
import { BulletComponent } from '../bullets/bullet.component';
import { PrimerComponent } from '../primers/primer.component';
import { PowderComponent } from '../powder/powder.component';
import { BrassComponent } from '../brass/brass.component';
import { BrandsService } from '../brands/brand.service';

@Component({
    directives: [ LoginComponent, BulletComponent, PrimerComponent, PowderComponent, BrassComponent ],
    providers: [ BrandsService ],
    selector: 'inventory',
    templateUrl: '/modules/inventory/inventory.tpl.html'
})

class InventoryComponent implements OnInit {
    loggedIn:boolean = false;
    active:string = 'bullets';
    brandFilter:string = '';
    brands:Array<any>;

    constructor(private _brandsService:BrandsService){
    }

    ngOnInit() {
        this.checkLoggedIn();
        this._getBrands();
    }

    setActive(category:string) {
        this.active = category;
    }

    checkLoggedIn() {
        this.loggedIn = this._isCookieValid();
    }

    setBrandFilter(event, brand:string) {
        this.brandFilter = brand;
    }

    _isCookieValid() {
        return document.cookie.indexOf('loggedinGaArms') > -1;
    }

    _getBrands() {
        this._brandsService.getBrands()
            .subscribe((response) => {
                this.brands = response;
            });
    }
}

export { InventoryComponent };
