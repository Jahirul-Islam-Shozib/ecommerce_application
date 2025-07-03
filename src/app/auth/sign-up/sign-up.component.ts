import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Select} from "primeng/select";
import {InputText} from "primeng/inputtext";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputGroup} from "primeng/inputgroup";
import {Password} from "primeng/password";

interface Company {
  name: string;
  code: string;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    Select,
    InputText,
    InputGroupAddon,
    InputGroup,
    Password
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  companies: Company[] = [
    { name: 'Square Pharma', code: 'SP' },
    { name: 'Square Toiletries', code: 'ST' },
    { name: 'Square Hospitals', code: 'SH' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      employeeId: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^(\+88)?01[3-9]\d{8}$/)  // Bangladesh mobile format
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('Form Data:', this.signUpForm.value);
      // Call API here
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
