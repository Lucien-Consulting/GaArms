// this is the overarching builder component
import { Component, OnInit, Input, OnChanges, SimpleChange } from 'angular2/core';
import { PowderService } from './powder.service';

@Component({
    directives: [],
    providers: [ PowderService ],
    selector: 'powder',
    templateUrl: '/modules/powder/powder.tpl.html'
})

class PowderComponent implements OnInit {
    @Input() brandFilter;

    constructor(private _powderService:PowderService) {
    }

    ngOnInit() {
        this._powderService.getPowder()
            .subscribe((response) => {
                this.powder = response;
                this.visiblePowder = response;
            });
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        let filter = changes.filter && changes.filter.currentValue;
        if (typeof filter !== 'undefined') {
            this.brandFilter = filter;
        }
        this.filter();
    }

    setActive(category:string) {
        this.active = category;
    }

    filter() {
        let filter = this.brandFilter;
        this.visibleBullets = this.bullets.filter((bullet) => {
            return bullet.brandName === filter || filter === '' || filter === 'All';
        });
    }

    _isCookieValid() {
        return document.cookie.indexOf('loggedInGaArms') > -1;
    }
}

export { PowderComponent };
