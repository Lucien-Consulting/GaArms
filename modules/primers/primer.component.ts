// this is the overarching builder component
import { Component, OnInit, Input, OnChanges, SimpleChange } from 'angular2/core';
import { PrimerService } from './primer.service';

@Component({
    directives: [],
    providers: [ PrimerService ],
    selector: 'primers',
    templateUrl: '/modules/primers/primer.tpl.html'
})

class PrimerComponent implements OnInit {
    @Input() brandFilter;

    constructor(private _primerService:PrimerService) {
    }

    ngOnInit() {
        this._primerService.getBullets()
            .subscribe((response) => {
                this.primers = response;
                this.visiblePrimers = response;
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

export { PrimerComponent };
