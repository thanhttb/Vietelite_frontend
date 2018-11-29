import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbDateCustomParserFormatter } from '../../../../../extra/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';
@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styles: [],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})
export class AddStudentComponent implements OnInit {
    studentForm = new FormGroup({
        first_name: new FormControl("", [Validators.required]),
        last_name: new FormControl("", [Validators.required]),
        dob: new FormControl(""),
        email: new FormControl(""),
        phone: new FormControl(""),
        gender: new FormControl(""),

        parentForm: new FormGroup({
            parent_name: new FormControl("", [Validators.required]),
            parent_phone_1: new FormControl("", [Validators.required, Validators.minLength(9)]),            
            parent_email: new FormControl("", [Validators.required, Validators.email]),
            parent_name_2: new FormControl(""),
            parent_phone_2: new FormControl("", [Validators.minLength(9)]),            
            parent_email_2: new FormControl("", [Validators.email]),
        })
    });
    constructor(
        private http: HttpClient,
        public snackBar: MatSnackBar,) { }

    ngOnInit() {
        this.studentForm.get('dob').setValue({ day: 8, month: 11, year: 2018 });
    }
    onSubmit() {
        console.warn(this.studentForm.value);
    }

    storeStudents(studentForm: NgForm) {
        // console.log('Form successful submit.');
        // console.log(productForm.value);
        console.log(studentForm.value);
        this.http.post('http://localhost/vietelite-api/public/student', studentForm.value).subscribe(res => {
            this.snackBar.open('res','action',{
              duration: 2000,
            });           

        }, err => {
            console.log('Error occured');
        });
        
    }

}

