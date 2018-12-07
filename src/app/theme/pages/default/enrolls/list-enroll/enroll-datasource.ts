import { EnrollService } from '../../../../../services/enroll.service';
import {ListEnroll} from './list-enroll.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";

export class EnrollDataSource extends DataSource<ListEnroll>{
	private enrollSubject = new BehaviorSubject<ListEnroll[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    constructor(private enrollService: EnrollService) {
        super();
    }
	connect() : Observable<ListEnroll[]>{
		return this.enrollSubject.asObservable();

	}

	disconnect(){
		this.enrollSubject.complete();
		this.loadingSubject.complete();
	}

	loadEnroll(option: string, filter = '',
        sortDirection = 'asc', pageIndex = 0, pageSize = 10) {
        this.loadingSubject.next(true);

        this.enrollService.getEnrolls(option, filter, sortDirection, pageIndex, pageSize)
            .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(enrolls => this.enrollSubject.next(enrolls));
    }
}