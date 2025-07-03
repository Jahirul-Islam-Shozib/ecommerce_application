import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputText} from "primeng/inputtext";
import {Password} from "primeng/password";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    InputGroup,
    InputGroupAddon,
    InputText,
    Password
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted ✅', this.loginForm.value);
      // call API here
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
