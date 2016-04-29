// this is the overarching builder component
import { Component, OnInit } from 'angular2/core';
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

    constructor(private _loginService:LoginService = LoginService) {
    }

    login() {
        this._loginService.login(this.username, this.password)
            .subscribe((response) => {
                if (response === 'success') {
                    this._setCookie();
                }
            });
    }

    _setCookie() {
        let d = new Date();
        d.setTime(d.getTime() + (30*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = "loggedInGaArms=true; " + expires;
        console.log('cookie!');
    }
}

export { LoginComponent };
