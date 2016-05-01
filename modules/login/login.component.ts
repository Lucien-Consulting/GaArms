// this is the overarching builder component
import { Component, OnInit, Output, EventEmitter } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { LoginService } from '../login/login.service';

@Component({
    directives: [],
    providers: [ LoginService ],
    selector: 'login',
    templateUrl: '/modules/login/login.tpl.html'
})

class LoginComponent implements OnInit {
    username:string = '';
    password:string = '';
    error:any = null;

    @Output checkLoggedInEvent:EventEmitter<any> = new EventEmitter();

    constructor(private _loginService:LoginService = LoginService) {
    }

    login() {
        this._loginService.login(this.username, this.password)
            .subscribe((response) => {
                if (response.id_user || response.id_user === 0) {
                    this.error = null;
                    this._setCookie();
                    this.checkLoggedInEvent.next();
                } else {
                    this.error = {
                        type: 'warning',
                        message: 'Invalid username or password.'
                    }
                }
            });
    }

    _setCookie() {
        let d = new Date();
        d.setTime(d.getTime() + (30*24*60*60*1000));
        let expires = "expires="+ d.toUTCString() + ';';
        document.cookie = "loggedinGaArms=true; " + expires + 'path=/;';
    }
}

export { LoginComponent };
