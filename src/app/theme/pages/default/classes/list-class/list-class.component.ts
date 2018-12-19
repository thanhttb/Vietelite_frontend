import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig,  MatDatepickerModule, MatSnackBar } from "@angular/material";
import { HttpClient } from '@angular/common/http';
import { NgbDateCustomParserFormatter } from '../../../../../extra/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Class } from '../classes.model';
import { ClassService } from '../../../../../services/class.service';
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { DialogClassComponent } from '../dialog-class/dialog-class.component';
import * as moment from 'moment';
@Component({
  selector: 'app-list-class',
  templateUrl: 'list-class.component.html',
  styles: [],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }, MatDatepickerModule, ClassService]
})
export class ListClassComponent implements OnInit {
  dataSource = new ClassDataSource(this.ClassService);
  count_class: number
  displayedColumns = ['id','name','description','class','note','tuition','time','teacher','active_student','edit'];
    
  constructor(private ClassService: ClassService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
      this.dataSource.loadClasses();

  }
  ngAfterViewInit() {
        // FILTER
        fromEvent(this.input.nativeElement, 'keyup')
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
        this.dataSource.loadClasses(
            this.input.nativeElement.value,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }
    //EDIT

    openDialog(row, mode:string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = row;
        //this.ClassService.findclasss(row.class_id).subscribe(data => dialogConfig.data = data[0]);
        console.log('Row Clicked: ', dialogConfig.data);
        const dialogRef = this.dialog.open(DialogClassComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if(data){
                    this.ClassService.updateClasses(row.class_id, data).subscribe(
                    res => {
                        this.snackBar.open('Sửa thành công', 'Đóng',{
                            duration: 2000,
                        });
                        this.loadLessonsPage();
                    },
                    err => {
                        this.snackBar.open('Lỗi xảy ra', 'Đóng',{
                            duration:2000
                        })
                    }
                    )
                }
                
            }
        );
    }
}
export class ClassDataSource extends DataSource<Class> {
    private classSubject = new BehaviorSubject<Class[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    constructor(private classService: ClassService) {
        super();
    }
    connect(): Observable<Class[]> {
        return this.classSubject.asObservable();
    }
    disconnect() {
        this.classSubject.complete();
        this.loadingSubject.complete();
    }
    loadClasses(filter = '',
        sortDirection = 'asc', pageIndex = 0, pageSize = 10) {
        this.loadingSubject.next(true);

        this.classService.findClasses(filter, sortDirection, pageIndex, pageSize)
            .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(classs => this.classSubject.next(classs));
    }
}