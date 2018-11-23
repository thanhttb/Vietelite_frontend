import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { HttpClient } from '@angular/common/http';
import { NgbDateCustomParserFormatter } from '../../../../../extra/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Student } from '../student.model';
import { StudentService } from '../../../../../services/student.service';
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import {fromEvent} from 'rxjs/observable/fromEvent';

@Component({
    selector: 'app-list-student',
    templateUrl: './list-student.component.html',
    styleUrls: ['./list-student.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})

export class ListStudentComponent implements OnInit {
    studentId = -1;
    dataSource = new StudentDataSource(this.studentService);
    count_student:number 
    displayedColumns = ['id', 'first_name', 'last_name', 'dob','gender', 'name','phone_1','phone_2','email','actions'];
    constructor(private studentService: StudentService) {
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('input') input: ElementRef;

    ngOnInit() {
        this.dataSource.loadStudent(this.studentId);
        this.studentService.countStudent().subscribe( count => this.count_student = count);
        console.log(this.count_student);
    }
    ngAfterViewInit() {
        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadLessonsPage();
                })
            )
            .subscribe();
        this.paginator.page
            .pipe(
                tap(() => this.loadLessonsPage())
            )
            .subscribe();
    }
    loadLessonsPage() {
        this.dataSource.loadStudent(
            this.studentId,
            this.input.nativeElement.value,
            'asc',
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    onRowClicked(row) {
        console.log('Row Clicked: ', row);
    }
}









export class StudentDataSource extends DataSource<Student> {
    private studentSubject = new BehaviorSubject<Student[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    constructor(private studentService: StudentService) {
        super();
    }
    connect(): Observable<Student[]> {
        return this.studentSubject.asObservable();
    }
    disconnect() {
        this.studentSubject.complete();
        this.loadingSubject.complete();
    }
    loadStudent(studentId:number, filter = '', 
                sortDirection = 'asc', pageIndex = 0, pageSize = 3){
        this.loadingSubject.next(true);

        this.studentService.findStudents(studentId, filter, sortDirection, pageIndex, pageSize)
                                .pipe(
                                    catchError(() => of([])),
                                    finalize(() => this.loadingSubject.next(false))
                                    )
                                .subscribe( students => this.studentSubject.next(students));
    }



}