import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

@Component({
    selector: 'app-edit-student',
    templateUrl: './edit-student.component.html',
    styleUrls: ['./edit-student.component.css'],
    providers: [
        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})

export class EditStudentComponent implements OnInit {
    description: string;
    studentForm = new FormGroup({
        first_name: new FormControl("", [Validators.required]),
        last_name: new FormControl("", [Validators.required]),
        dob: new FormControl(moment([2017, 0, 1])),
        gender: new FormControl(""),
        phone: new FormControl(""),
        email: new FormControl(""),
        class: new FormControl(""),
        school: new FormControl(""),
        parentForm: new FormGroup({
            name: new FormControl("", [Validators.required]),
            phone_1: new FormControl("", [Validators.required, Validators.minLength(9)]),
            phone_2: new FormControl("", [Validators.minLength(9)]),
            parent_email: new FormControl("", [Validators.required, Validators.email]),
            parent_email_2: new FormControl(""),
            work: new FormControl(""),
            address: new FormControl("")

        })
    });
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditStudentComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.studentForm.patchValue({
            first_name: data.first_name,
            last_name: data.last_name,
            dob: data.dob,
            gender: data.gender,
            class: data.class,
            school: data.school,
            phone: data.phone,
            email: data.email,
            parentForm: {
                name: data.name,
                parent_email: data.parent_email,
                parent_email_2: data.parent_email_2,
                work: data.work,
                address: data.address,
                phone_1: data.phone_1,
                phone_2: data.phone_2
            }
        });
    }

    ngOnInit() {
    }
    save() {
        this.dialogRef.close(this.studentForm.value);
    }

    close() {
        this.dialogRef.close();
    }
}
