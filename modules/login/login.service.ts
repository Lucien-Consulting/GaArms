import { Injectable } from 'angular2/core';
import { Headers, Http } from 'angular2/http';

@Injectable()

class LoginService {

    constructor(private _http:Http) {
    }

    login(username:string, password:string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            username: username,
            password: password
        };

        return this._http.post('./api/login.php',
            JSON.stringify(data),
            {headers: headers}
        ).map((response) => response.json());
    }
}

export { LoginService };
