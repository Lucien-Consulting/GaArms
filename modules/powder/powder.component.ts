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
    powder:Array<any>;
    visiblePowder:Array<any>;
    brandFilter:string;
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

    ngOnChanges(changes: any) {
        let filter = changes.filter && changes.filter.currentValue;
        if (typeof filter !== 'undefined') {
            this.brandFilter = filter;
            this.filter();
        }
    }

    filter() {
        let filter = this.brandFilter;
        this.visiblePowder = this.powder.filter((powder) => {
            return powder.brandName === filter || filter === '' || filter === 'All';
        });
    }
}

export { PowderComponent };
