import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ListEnroll } from '../theme/pages/default/enrolls/list-enroll/list-enroll.model'
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";

@Injectable()
export class EnrollService {
    private api = "http://localhost/vietelite-api/public"
    private list_enroll_url = this.api + "/enroll/list";

    constructor(private http: HttpClient) { }

    getEnrolls(option: string, filter: string = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<ListEnroll[]> {
        return this.http.get(this.list_enroll_url, {
            params : new HttpParams()
                .set('option', option)
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(map(res => { res['payload'] = res; return res['payload'] }));
    }
    
}
