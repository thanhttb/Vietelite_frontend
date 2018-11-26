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
    MatListModule, MatSelectModule, MatSidenavModule,
} from '@angular/material';
import {MatMomentDateModule} from "@angular/material-moment-adapter";

import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "add",
                "component": AddStudentComponent
            },
            {
                "path": "list",
                "component": ListStudentComponent
            }
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
        MatMomentDateModule
    ], exports: [
        RouterModule
    ], declarations: [
        AddStudentComponent,
        ListStudentComponent,
        EditStudentComponent,
    ], entryComponents: [EditStudentComponent]
})
export class StudentModule { }
