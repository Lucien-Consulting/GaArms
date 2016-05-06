// this is the overarching builder component
import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { ProductsService } from './products.service';

@Component({
    directives: [],
    providers: [ ProductsService ],
    selector: 'manage-products',
    templateUrl: '/modules/products/manageProducts.tpl.html'
})

class ManageProductsComponent implements OnInit, OnChanges {
    products:Array<any>;
    modalType:string = '';
    selectedProduct:any;
    selectedType:string = '';
    selectedBrand:string = '';
    prodName:string = '';
    error:any = {};

    @Input() brandFilter:string;
    @Input() brands:any;
    @Output() updateProducts:EventEmitter<any> = new EventEmitter();

    constructor(private _productsService:ProductsService) {
    }

    ngOnInit() {
        this._productsService.getProducts()
            .subscribe((response) => {
                this.products = response;
                this.visibleProducts = response;
            });
        this._productsService.getTypes()
            .subscribe((response) => {
                this.productTypes = response;
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

    showModal(prod) {
        this.modalType = prod ? 'Delete' : 'Add';
        this.selectedProduct = prod;
    }

    closeModal() {
        this.modalType = '';
        this.selectedProduct = null;
        this.selectedType = '';
        this.selectedBrand = '';
        this.prodName = '';
    }

    addProduct() {
        this._productsService.addProduct(this.selectedType, this.selectedBrand, this.prodName)
            .subscribe((response) => {
                if (response === 'success') {
                    this.updateProducts.next('Add');
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
                    this.updateProducts.next('Delete');
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
}

export { ManageProductsComponent };
