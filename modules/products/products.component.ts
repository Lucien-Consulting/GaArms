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
    sortBy:string;
    updateQuantity:number;
    initial:string;
    modalType:string;
    selectedProduct:any;
    error:any = {};
    reportData:any = null;
    timeframe:string;

    @Input() currentProductType:string; // bullets, primers, brass, powder
    @Input() brandFilter:string;
    @Input() productsChanged:boolean;

    constructor(private _productsService:ProductsService) {
    }

    ngOnInit() {
        this._initialize();
    }

    ngOnChanges(changes: any) {
        let filter = changes.brandFilter && changes.brandFilter.currentValue;
        let currentProductType = changes.currentProductType && changes.currentProductType.currentValue;
        let changed = changes.productsChanged && changes.productsChanged.currentValue;
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
        if (changed === 'Add' || changed === 'Delete') {
            this._initialize();
            this.productsChanged = null;
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

    showModal(prod, type) {
        this.modalType = type;
        this.selectedProduct = prod;
    }

    closeModal() {
        this.modalType = null;
        this.updateQuantity = 0;
        this.initial = '';
        this.selectedProduct = null;
        this.reportData = null;
    }

    updateProduct() {
        let modalType = this.modalType;
        if (modalType === 'Add') {
            this._productsService.updateProduct(
                this.selectedProduct.id_product, 
                parseInt(this.selectedProduct.quantity) + this.updateQuantity,
                this.initial,
                this.updateQuantity,
                this.currentProductType
            ).subscribe(this._updateCallback(response));
        } 
        else if (modalType === 'Remove') {
            this._productsService.updateProduct(
                this.selectedProduct.id_product, 
                parseInt(this.selectedProduct.quantity) - this.updateQuantity,
                this.initial,
                -this.updateQuantity,
                this.currentProductType
            ).subscribe(this._updateCallback(response));
        }
    }

    generateReport() {
        this.modalType = null;
        this._productsService.generateReport(this.selectedProduct.id_product, this.timeframe)
            .subscribe((response) => {
                if (response && response.length > 0) {
                    let reportLog = {
                        productName: response[0].productName,
                        net: 0,
                        totalAdded: 0,
                        totalRemoved: 0,
                        logs: response
                    };
                    for (let log of response) {
                        let added = parseInt(log.added);
                        let removed = parseInt(log.removed);
                        reportLog.totalAdded += added;
                        reportLog.totalRemoved += removed;
                        if (added) {
                            reportLog.net += parseInt(log.added);
                        } else {
                            reportLog.net -= parseInt(log.removed);
                        }
                    }
                    this.reportData = reportLog;
                } else {
                    this.error.message = 'There are no logs for ' + this.selectedProduct.productName +
                                         ' for the selected time frame. (' + this.timeframe + ')';
                }
            });
    }

    downloadReport() {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        let arrData = this.reportData.logs;
        let reportTitle = this.timeframe + ' Report for: ' + this.reportData.productName;
        
        let CSV = '';    
        //Set Report title in first row or line
        
        CSV += reportTitle + '\r\n\n';

        let row = "";
        
        //This loop will extract the label from 1st index of on array
        for (let index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            //do not add index for $$hashkey or key
            if (index !== '$$hashKey' && index !== 'key' && index !== "status") {
                row += index + ',';
            }
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
        
        //1st loop is to extract each row
        for (let i = 0; i < arrData.length; i++) {
            let row = "";
            
            //2nd loop will extract each column and convert it in string comma-seprated
            for (let index in arrData[i]) {
                if (index !== '$$hashKey' && index !== 'key' && index !== "status") {
                    row += '"' + arrData[i][index] + '",';
                }
            }

            row.slice(0, row.length - 1);
            
            //add a line break after each row
            CSV += row + '\r\n';
        }
        
        //Generate a file name
        let fileName = reportTitle.replace(/ /g,"_"); 
        
        //Initialize file format you want csv or xls
        let uri = 'data:text/csv;charset=utf-8,' + escape(CSV); 
        
        //this trick will generate a temp <a /> tag
        let link = document.createElement("a");    
        link.href = uri;
        
        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        
        //this part will append the anchor tag and remove it after automatic click
        //auto click will download the file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    dismissError() {
        this.error = {};
    }

    _initialize() {
        this._productsService.getBullets()
            .subscribe((response) => {
                this.bullets = response;
                this.visibleProducts = response;
                this.currentProductType = 'Bullets';
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

    _updateCallback(response) {
        if (response === 'success') {
            this.selectedProduct.quantity = parseInt(this.selectedProduct.quantity) + this.updateQuantity;
            this.closeModal();   
        }
        else {
            this.error.message = response;
        }
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
            default:
                products = this.bullets;
        }
        return products;
    }
}

export { ProductsComponent };
