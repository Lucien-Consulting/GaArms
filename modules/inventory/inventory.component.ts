// this is the overarching builder component
import { Component, OnInit } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { LoginComponent } from '../login/login.component';
import { ProductsComponent } from '../products/products.component';
import { ManageProductsComponent } from '../products/manageProducts.component';
import { ManageBrandsComponent } from '../brands/brands.component';
import { BrandsService } from '../brands/brands.service';

@Component({
    directives: [ LoginComponent, ProductsComponent, ManageProductsComponent, ManageBrandsComponent ],
    providers: [ BrandsService ],
    selector: 'inventory',
    templateUrl: '/modules/inventory/inventory.tpl.html'
})

class InventoryComponent implements OnInit {
    loggedIn:boolean = false;
    active:string = 'Bullets';
    brandFilter:string;
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

    updateBrands() {
        this._getBrands();
    }

    updateProducts(val) {
        this.productsChanged = val;
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
