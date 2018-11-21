import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../theme/pages/default/students/student.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {
  private url = "http://localhost/vietelite-api/public/students"
  constructor( private http:HttpClient ) { }

  getStudent() : Observable<Student[]>{
  	console.log("this.http.get<Student[]>(this.url)");
  	return this.http.get<Student[]>(this.url);
  } 

}
