// this is the overarching builder component
import { Component, OnInit, Input, OnChanges, SimpleChange } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { ProductsService } from './products.service';

@Component({
    directives: [],
    providers: [ ProductsService ],
    selector: 'products',
    templateUrl: '/modules/products/products.tpl.html'
})

class ProductsComponent implements OnInit, OnChanges {
    bullets:Array<any>;
    primers:Array<any>;
    brass:Array<any>;
    powder:Array<any>;
    visibleProducts:Array<any>;
    searchTerm:string;
    sortBy:string = 'asc';
    @Input() currentProductType:string; // bullets, primers, brass, powder
    @Input() brandFilter:string;

    constructor(private _productsService:ProductsService) {
    }

    ngOnInit() {
        this._productsService.getBullets()
            .subscribe((response) => {
                this.bullets = response;
                this.visibleProducts = response;
            });
        this._productsService.getPrimers()
            .subscribe((response) => {
                this.primers = response;
            });
        this._productsService.getBrass()
            .subscribe((response) => {
                this.brass = response;
            });
        this._productsService.getPowder()
            .subscribe((response) => {
                this.powder = response;
            });
    }

    ngOnChanges(changes: any) {
        let filter = changes.brandFilter && changes.brandFilter.currentValue;
        let currentProductType = changes.currentProductType && changes.currentProductType.currentValue;
        if (typeof filter !== 'undefined') {
            this.brandFilter = filter;
            this.filter();
        }
        if (typeof currentProductType !== 'undefined') {
            this.visibleProducts = this._getProductsByType();
            if (this.brandFilter) {
                this.filter();
            }
            if (this.searchTerm) {
                this.search();
            }
        }
    }

    filter() {
        let filter = this.brandFilter;
        let products = this._getProductsByType();
        let visible = products.filter((bullet) => {
            return bullet.brandName === filter || filter === '' || filter === 'All';
        });
        if (visible.length) {
            this.visibleProducts = visible;
        }
        else {
            this.visibleProducts = [];
        }
    }

    search() {
        let filter = this.searchTerm.toLowerCase();
        if (filter === '' && this.brandFilter !== '') {
            this.filter();
        } else {
            let products = this._getProductsByType();
            let visible = products.filter((prod) => {
                return prod.brandName.toLowerCase().indexOf(filter) > -1 ||
                       prod.productName.toLowerCase().indexOf(filter) > -1 ||
                       filter === '';
            });
            if (visible.length) {
                this.visibleProducts = visible;
            }
            else {
                this.visibleProducts = [];
            }
        }
    }

    sortProds(category:string) {
        this.sortCat = category;
        this.visibleProducts.sort((a, b) => {
            if (this.sortBy = 'asc') {
                return a[category] - b[category];
            } else {
                return b[category] - a[category];
            }
        });
        this.sortBy = this.sortBy === 'asc' ? 'dec' : 'asc';
    }

    _getProductsByType() {
        let products;
        switch (this.currentProductType) {
            case 'Bullets':
                products = this.bullets;
                break;
            case 'Primers':
                products = this.primers;
                break;
            case 'Brass':
                products = this.brass;
                break;
            case 'Powder':
                products = this.powder;
                break;
        }
        return products;
    }
}

export { ProductsComponent };
