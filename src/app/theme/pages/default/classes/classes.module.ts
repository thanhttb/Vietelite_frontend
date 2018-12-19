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
import { DefaultComponent } from '../default.component';
import { ListClassComponent } from './list-class/list-class.component';
import { DialogClassComponent } from './dialog-class/dialog-class.component';
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "list",
                "component": ListClassComponent
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
    ], exports: [
        RouterModule
    ], declarations: [
        ListClassComponent,
        DialogClassComponent
    ], entryComponents: [DialogClassComponent],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class ClassesModule { }
