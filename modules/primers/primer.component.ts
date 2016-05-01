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
        this._primerService.getPrimers()
            .subscribe((response) => {
                this.primers = response;
                this.visiblePrimers = response;
            });
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        let filter = changes.filter && changes.filter.currentValue;
        if (typeof filter !== 'undefined') {
            this.brandFilter = filter;
            this.filter();
        }
    }

    filter() {
        let filter = this.brandFilter;
        this.visiblePrimers = this.primers.filter((primer) => {
            return primer.brandName === filter || filter === '' || filter === 'All';
        });
    }
}

export { PrimerComponent };
