import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styles: []
})
export class EditStudentComponent implements OnInit {
  description:string;
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
          parent_phone_2: new FormControl("", [Validators.minLength(9)]),
          parent_email: new FormControl("", [Validators.required, Validators.email]),
      })
  });
  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      console.log(data);
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
