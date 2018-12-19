import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Class } from '../theme/pages/default/classes/classes.model';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";

@Injectable()
export class ClassService {
    private api = "http://localhost/vietelite-api/public"
    private class_url = this.api +"/class";
    private count_classes_url = this.api + "/class/count";

    private token = JSON.parse(localStorage.getItem('currentUser')).access_token;
    constructor(private http: HttpClient) { }

    countClass(): Observable<any> {
        return this.http.get(this.count_classes_url, {
            params: new HttpParams()
                .set('token', this.token)
        });
    }
    findClasses( filter: string = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<Class[]> {
        return this.http.get(this.class_url, {
            params: new HttpParams()
                .set('token', this.token)
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(map(res => { res['payload'] = res; return res['payload'] }));
    }
    updateClasses(classID: number, data):Observable<any> {
        return this.http.put(this.class_url + classID, data, {
            params: new HttpParams().set('token', this.token)
        });
    }
    addClasses(data):Observable<any>{
        return this.http.post(this.class_url, data,{
            params: new HttpParams().set('token', this.token)
        })
    }

}
