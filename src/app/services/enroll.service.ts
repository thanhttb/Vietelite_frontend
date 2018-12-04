import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../theme/pages/default/students/student.model';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";

@Injectable()
export class EnrollService {
    private api = "http://localhost/vietelite-api/public"
    private all_enroll_url = this.api + "/enroll";

    constructor(private http: HttpClient) { }

    getStudent(): Observable<Student[]> {
        return this.http.get<Student[]>(this.all_enroll_url);
    }
    
}
