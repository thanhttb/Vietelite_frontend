import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbDateCustomParserFormatter } from '../../../../../extra/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';
@Component({
    selector: 'app-enroll-student',
    templateUrl: './enroll-student.component.html',
    styles: [],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})
export class EnrollStudentComponent implements OnInit {
    //this.myForm.addControl('newControl', new FormControl('', Validators.required));
    enroll = 0;
    studentForm = this.fb.group({
        first_name: new FormControl("", [Validators.required]),
        last_name: new FormControl("", [Validators.required]),
        dob: new FormControl(""),

        parentForm: new FormGroup({
            parent_name: new FormControl("", [Validators.required]),
            parent_phone_1: new FormControl("", [Validators.required, Validators.minLength(9)]),
            parent_email: new FormControl("", [Validators.required, Validators.email]),
        }),

        enrollForm: this.fb.array([this.buildEnroll()])
    });
    constructor(
        private http: HttpClient,
        public snackBar: MatSnackBar,
        public fb: FormBuilder) { }

    ngOnInit() {
        this.studentForm.get('dob').setValue({ day: 8, month: 11, year: 2001 });

    }
    buildEnroll() {
        return new FormGroup({
            subject: new FormControl("", [Validators.required]),
            class: new FormControl("", [Validators.required]),
            appointment: new FormControl(""),
            note: new FormControl("")
        });
    }
    addEnroll() {
        this.enroll++;

    }
    onSubmit() {
        console.warn(this.studentForm.value);
    }

    storeEnrolls(studentForm: NgForm) {
        // console.log('Form successful submit.');
        // console.log(productForm.value);
        console.log(studentForm.value);
        this.http.post('http://localhost/vietelite-api/public/enroll', studentForm.value).subscribe(res => {
            this.snackBar.open('res', 'action', {
                duration: 2000,
            });

        }, err => {
            console.log('Error occured');
        });

    }

}

