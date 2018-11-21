import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from './student.model';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class StudentServiceService {
  private all_student_url = "http://localhost/vietelite-api/public/students";
  private find_student_url = "http://localhost/vietelite-api/public/student"
  constructor( private http:HttpClient ) { }

  getStudent() : Observable<Student[]>{
  	return this.http.get<Student[]>(this.all_student_url);
  } 
  findStudents(
  	studentID:number, filter:string = '', sortOrder = 'asc',
  	pageNumber = 0, pageSize = 3){
  		return this.http.get(this.find_student_url, {
  			params: new HttpParams()
  				.set('studentId', studentID.toString())
  				.set('filter', filter)
  				.set('sortOder', sortOrder)
  				.set('pageNumber', pageNumber.toString())
  				.set('pageSize', pageSize.toString())
  		}).subscribe(res => res['payload']);
  }
}
