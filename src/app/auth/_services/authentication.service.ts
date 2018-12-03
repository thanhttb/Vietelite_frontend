import { Injectable } from "@angular/core";
import { Http, Response,Headers } from "@angular/http";
import "rxjs/add/operator/map";

const httpOptions = {
        headers: new Headers({
            'Content-Type':  'application/json',
        })
    }
@Injectable()    
export class AuthenticationService {

    constructor(private http: Http) {
    }

    login(data) {
        return this.http.post( 'http://localhost/vietelite-api/public/api/auth/login', data, httpOptions)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                console.log(user);
                if (user && user.access_token) {
                    console.log(user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}