import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatDialogModule,
    MatDatepickerModule,
    MatListModule, MatSelectModule, MatSidenavModule, MAT_DATE_LOCALE,
    MatSnackBarModule
} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { LayoutModule } from '../../../layouts/layout.module';

import { AddEnrollComponent } from './add-enroll/add-enroll.component';
import { ListEnrollComponent } from './list-enroll/list-enroll.component';
import { DefaultComponent } from '../default.component';
import { KtdvEnrollComponent } from './ktdv-enroll/ktdv-enroll.component';
import { GetMarkEnrollComponent } from './get-mark-enroll/get-mark-enroll.component';
import { ResultEnrollComponent } from './result-enroll/result-enroll.component';
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "add",
                "component": AddEnrollComponent
            },
            {
                "path": "list",
                "component": ListEnrollComponent
            },
            {
                "path" : "ktdv",
                "component": KtdvEnrollComponent
            },
            {
                "path" : "mark",
                "component": GetMarkEnrollComponent
            },
            {
                "path" : "result",
                "component": ResultEnrollComponent
            },
            
        ]
    }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes),
    LayoutModule, ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatMomentDateModule,
    MatSnackBarModule
  ],
  exports: [
   	RouterModule
   ],
  declarations: [AddEnrollComponent, ListEnrollComponent, KtdvEnrollComponent, GetMarkEnrollComponent, ResultEnrollComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class EnrollsModule { }
