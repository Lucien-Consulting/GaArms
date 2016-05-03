///<reference path="./node_modules/angular2/typings/browser.d.ts"/>
import 'zone.js';
import 'reflect-metadata';
import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/add/operator/map';
import { InventoryComponent } from './modules/inventory/inventory.component';
import {enableProdMode} from 'angular2/core';

enableProdMode();
bootstrap(InventoryComponent, [ HTTP_PROVIDERS ]);
