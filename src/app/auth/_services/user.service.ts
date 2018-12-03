import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";

const httpOptions = {
        headers: new Headers({
            'Content-Type':  'application/json',
        })
    }
@Injectable()
export class UserService {
    iss = {
        login: 'http://localhost/vietelite-api/public/api/auth/login',
        signup: 'http://localhost/vietelite-api/public/api/auth/signup'
    }
    constructor(private http: Http) {
    }


    verify() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.access_token) {
            const token = currentUser.access_token;
            const payload = JSON.parse(atob(token.split('.')[1]));
            // console.log(payload);
            return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
        }        
    }

    forgotPassword(email: string) {
        return this.http.post('/api/forgot-password', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user) {
        return this.http.post(this.iss.signup, user, httpOptions);
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.access_token });
            return new RequestOptions({ headers: headers });
        }
    }
}