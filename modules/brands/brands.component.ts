// this is the overarching builder component
import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { BrandsService } from './brands.service';

@Component({
    directives: [],
    providers: [ BrandsService ],
    selector: 'manage-brands',
    templateUrl: '/modules/brands/brands.tpl.html'
})

class ManageBrandsComponent implements OnInit {
    brands:Array<any>;
    modalType:string = '';
    selectedBrand:any;
    brandName:string = '';
    error:any = {};

    @Input() brands:any;
    @Output() updateBrands:EventEmitter<any> = new EventEmitter();

    constructor(private _brandsService:BrandsService) {
    }

    ngOnInit() {
        this._getBrands();
    }

    filter() {
        let filter = this.brandFilter;
        let products = this._getProductsByType();
        let visible = products.filter((product) => {
            return product.brandName === filter || filter === '' || filter === 'All';
        });
        if (visible.length) {
            this.visibleProducts = visible;
        }
        else {
            this.visibleProducts = [];
        }
    }

    search() {
        let filter = this.searchTerm;
        if (filter === '' && this.brandFilter !== '' && typeof this.brandFilter !== 'undefined') {
            this.filter();
        } else {
            filter = filter ? filter.toLowerCase() : '';
            let products = this.brands;
            let visible = brands.filter((brand) => {
                return brand.name.toLowerCase().indexOf(filter) > -1 ||
                       filter === '';
            });
            if (visible.length) {
                this.visibleBrands = visible;
            }
            else {
                this.visibleBrands = [];
            }
        }
    }

    showModal(brand) {
        this.modalType = brand ? 'Delete' : 'Add';
        this.selectedBrand = brand;
    }

    closeModal() {
        this.modalType = '';
        this.selectedBrand = null;
        this.brandName = '';
    }

    addBrand() {
        this._brandsService.addBrand(this.brandName)
            .subscript((response) => {
                if (response === 'success') {
                    this.updateBrands.next(true);
                    this._getBrands();
                }
                else {
                    this.error.message = response;
                }
                this.closeModal();
            });
    }

    confirmDelete() {
        this._productsService.deleteProduct(this.selectedProduct.id_product)
            .subscribe((response) => {
                if (response === 'success') {
                    this.updateBrands.next(true);
                    this._getBrands();
                }
                else {
                    this.error.message = response;
                }
                this.closeModal();
            });
    }

    dismissError() {
        this.error = {};
    }

    _getBrands() {
        this._brandsService.getBrands()
            .subscribe((response) => {
                this.brands = response;
                this.visibleBrands = response;
            });
    }
}

export { ManageBrandsComponent };
