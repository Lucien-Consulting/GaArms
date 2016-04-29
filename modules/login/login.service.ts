import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()

class LoginService {

    constructor(private _http:Http) {
    }

    login(username:string, password:string) {
        let data = 'username=' + username +
                    '&password= ' + password;

        return this._http.post('./api/login.php',
            data
        ).map((response) => response);
    }
}

export { LoginService };
