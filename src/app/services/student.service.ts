import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../theme/pages/default/students/student.model';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";

@Injectable()
export class StudentService {
    private api = "http://localhost/vietelite-api/public"
    private all_student_url = this.api + "students";
    private find_student_url = this.api +"/student";
    private count_students_url = this.api + "/student/count";
    private update_student_url = this.api + "/student/";
    private token = JSON.parse(localStorage.getItem('currentUser')).access_token;
    constructor(private http: HttpClient) { }

    getStudent(): Observable<Student[]> {
        return this.http.get<Student[]>(this.all_student_url);
    }
    countStudent(): Observable<any> {
        return this.http.get(this.count_students_url, {
            params: new HttpParams()
                .set('token', this.token)
        });
    }
    findStudents(studentID: number, filter: string = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<Student[]> {
        return this.http.get(this.find_student_url, {
            params: new HttpParams()
                .set('token', this.token)
                .set('studentId', studentID.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(map(res => { res['payload'] = res; return res['payload'] }));
    }
    updateStudents(studentID: number, data):Observable<any> {
        return this.http.put(this.update_student_url + studentID, data, {
            params: new HttpParams().set('token', this.token)
        });
    }

}
