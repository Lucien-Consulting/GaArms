// this is the overarching builder component
import { Component, OnInit, Input, OnChanges, SimpleChange } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { BulletService } from './bullet.service';

@Component({
    directives: [],
    providers: [ BulletService ],
    selector: 'bullets',
    templateUrl: '/modules/bullets/bullet.tpl.html'
})

class BulletComponent implements OnInit {
    bullets:Array<any>;
    visibleBullets:Array<any>;
    searchTerm:string;
    @Input() brandFilter;

    constructor(private _bulletService:BulletService) {
    }

    ngOnInit() {
        this._bulletService.getBullets()
            .subscribe((response) => {
                this.bullets = response;
                this.visibleBullets = response;
            });
    }

    ngOnChanges(changes: any) {
        let filter = changes.brandFilter && changes.brandFilter.currentValue;
        if (typeof filter !== 'undefined') {
            this.brandFilter = filter;
            this.filter();
        }
    }

    filter() {
        let filter = this.brandFilter;
        let visible = this.bullets.filter((bullet) => {
            return bullet.brandName === filter || filter === '' || filter === 'All';
        });
        if (visible.length) {
            this.visibleBullets = visible;
        }
        else {
            this.visibleBullets = [];
        }
    }

    search() {
        let filter = this.searchTerm;
        let visible = this.bullets.filter((bullet) => {
            return bullet.brandName.indexOf(filter) > -1 ||
                   bullet.productName.indexOf(filter) > -1 ||
                   filter === '';
        });
        if (visible.length) {
            this.visibleBullets = visible;
        }
        else {
            this.visibleBullets = [];
        }
    }
}

export { BulletComponent };
