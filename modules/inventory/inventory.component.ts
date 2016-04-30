// this is the overarching builder component
import { Component, OnInit } from 'angular2/core';
import { LoginComponent } from '../login/login.component';
import { BulletComponent } from '../bullets/bullet.component';
import { PrimerComponent } from '../primers/primer.component';
import { PowderComponent } from '../powder/powder.component';
import { BrassComponent } from '../brass/brass.component';

@Component({
    directives: [ LoginComponent, BulletComponent, PrimerComponent, PowderComponent, BrassComponent ],
    providers: [],
    selector: 'inventory',
    templateUrl: '/modules/inventory/inventory.tpl.html'
})

class InventoryComponent implements OnInit {
    loggedIn:boolean = false;
    active:string = 'bullets';

    ngOnInit() {
        this.loggedIn = this._isCookieValid();
    }

    setActive(category:string) {
        this.active = category;
    }

    checkLoggedIn() {
        this.loggedIn = this._isCookieValid();
    }

    _isCookieValid() {
        return document.cookie.indexOf('loggedInGaArms') > -1;
    }
}

export { InventoryComponent };
