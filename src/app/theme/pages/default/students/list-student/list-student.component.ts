import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from "@angular/material";
import { HttpClient } from '@angular/common/http';
import { NgbDateCustomParserFormatter } from '../../../../../extra/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Student } from '../student.model';
import { StudentService } from '../../../../../services/student.service';
import { catchError, finalize} from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { MatDatepickerModule } from '@angular/material';
import * as moment from 'moment';

@Component({
    selector: 'app-list-student',
    templateUrl: './list-student.component.html',
    styleUrls: ['./list-student.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }, MatDatepickerModule]
})

export class ListStudentComponent implements OnInit {
    studentId = -1;
    dataSource = new StudentDataSource(this.studentService);
    count_student:number 
    displayedColumns = ['id', 'first_name', 'last_name', 'dob','gender', 'name','phone_1','phone_2','email','actions'];
    constructor(private studentService: StudentService,
                private dialog: MatDialog) {
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('input') input: ElementRef;
    @ViewChild(MatSort) sort:MatSort;

    ngOnInit() {
        this.dataSource.loadStudent(this.studentId);
        this.studentService.countStudent().subscribe( count => this.count_student = count);
        // console.log(this.count_student);
    }
    ngAfterViewInit() {
        // FILTER
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
        // PAGINATION
        this.paginator.page
            .pipe(
                tap(() => this.loadLessonsPage())
            )
            .subscribe();
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadLessonsPage())
                )
            .subscribe();
    }
    loadLessonsPage() {
        this.dataSource.loadStudent(
            this.studentId,
            this.input.nativeElement.value,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }
    //EDIT

    openDialog(rowm,){
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 1,
            first_name: 'Tran',
            last_name: 'Thanh'
        }

        this.dialog.open(EditStudentComponent, dialogConfig);

        const dialogRef = this.dialog.open(EditStudentComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => console.log("Dialog OUtput data: ", data)
            );
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