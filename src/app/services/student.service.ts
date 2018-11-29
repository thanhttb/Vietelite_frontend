import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../theme/pages/default/students/student.model';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";

@Injectable()
export class StudentService {
    private all_student_url = "http://localhost/vietelite-api/public/students";
    private find_student_url = "http://localhost/vietelite-api/public/student";
    private count_students_url = "http://localhost/vietelite-api/public/student/count";
    constructor(private http: HttpClient) { }

    getStudent(): Observable<Student[]> {
        return this.http.get<Student[]>(this.all_student_url);
    }
    countStudent(): Observable<any> {
        return this.http.get(this.count_students_url);
    }
    findStudents(studentID: number, filter: string = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<Student[]> {
        return this.http.get(this.find_student_url, {
            params: new HttpParams()
                .set('studentId', studentID.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(map(res => { res['payload'] = res; return res['payload'] }));
    }
}
