// this is the overarching builder component
import { Component, OnInit, Input, OnChanges, SimpleChange } from 'angular2/core';
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
    brandFilter:string;
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
        let filter = changes.filter && changes.filter.currentValue;
        if (typeof filter !== 'undefined') {
            this.brandFilter = filter;
        }
        this.filter();
    }

    filter() {
        let filter = this.brandFilter;
        this.visibleBullets = this.bullets.filter((bullet) => {
            return bullet.brandName === filter || filter === '' || filter === 'All';
        });
    }
}

export { BulletComponent };
