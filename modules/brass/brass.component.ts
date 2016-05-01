// this is the overarching builder component
import { Component, OnInit, Input, OnChanges, SimpleChange } from 'angular2/core';
import { BrassService } from './brass.service';

@Component({
    directives: [],
    providers: [ BrassService ],
    selector: 'brass',
    templateUrl: '/modules/brass/brass.tpl.html'
})

class BrassComponent implements OnInit {
    brass:Array<any>;
    visibleBrass:Array<any>;
    
    @Input() brandFilter;

    constructor(private _brassService:BrassService) {
    }

    ngOnInit() {
        this._brassService.getBrass()
            .subscribe((response) => {
                this.brass = response;
                this.visibleBrass = response;
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
        this.visibleBrass = this.brass.filter((brass) => {
            return brass.brandName === filter || filter === '' || filter === 'All';
        });
    }
}

export { BrassComponent };
