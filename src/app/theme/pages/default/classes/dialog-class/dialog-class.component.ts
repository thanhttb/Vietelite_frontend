import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

@Component({
    selector: 'app-dialog-class',
    templateUrl: './dialog-class.component.html',
    styleUrls: ['./dialog-class.component.css'],
    providers: [
        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})

export class DialogClassComponent implements OnInit {
    description: string;
    classForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        class: new FormControl(moment([2017, 0, 1])),
        note: new FormControl(""),
        tuition: new FormControl(""),
        time: new FormControl(""),
        teacher: new FormControl(""),
        active_students: new FormControl(""),
    });
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogClassComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.classForm.patchValue({
            name: data.name,
            description: data.description,
            class: data.class,
            note: data.note,
            tuition: data.tuition,
            time: data.time,
            teacher: data.teacher,
            active_students: data.active_students,
            
        });
    }

    ngOnInit() {
    }
    save() {
        this.dialogRef.close(this.classForm.value);
    }

    close() {
        this.dialogRef.close();
    }
}