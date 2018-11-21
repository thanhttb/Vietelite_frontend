import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbDateCustomParserFormatter } from '../../../../../extra/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {MatTableDataSource} from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Student } from '../student.model';
import { StudentService } from '../../../../../services/student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})

export class ListStudentComponent implements OnInit {
  dataSource = new StudentDataSource(this.studentService);
  displayedColumns = ['id', 'first_name', 'dob', 'last_name'];
  constructor(private studentService:StudentService) { 
  }

  ngOnInit() {
  }
  
  onRowClicked(row){
    console.log('Row Clicked: ', row);
  }
}

export class StudentDataSource extends DataSource<Student> {
  private students = new BehaviorSubject<Student[]>([]);
  private loading = new BehaviorSubject<boolean>(false);

  public loading$ = this.loading.asObservable();
  constructor(private studentService: StudentService) {
    super();
  }
  connect(): Observable<Student[]>{
    return this.students.asObservable();
  }
  disconnect(){
    this.students.complete();
    this.loading.complete();
  }
  
  
  
}