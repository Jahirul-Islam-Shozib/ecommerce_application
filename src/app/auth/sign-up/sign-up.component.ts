import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Select} from "primeng/select";
import {InputText} from "primeng/inputtext";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputGroup} from "primeng/inputgroup";
import {Password} from "primeng/password";
import {MessageService} from "primeng/api";
import {Toast} from "primeng/toast";
import {User} from "../../models/User";
import {AuthService} from "../../service/auth.service";

interface Company {
  label: string;
  value: string;
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
    Password,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})


export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  companies: Company[] = [
    {label: 'Square Toiletries Limited', value: 'Square Toiletries Limited'},
    {label: 'Square Food & Beverage Ltd', value: 'Square Food & Beverage Ltd'},
    {label: 'Square Health Limited', value: 'Square Health Limited'},
    {label: 'Square Pharmaceuticals Limited', value: 'Square Pharmaceuticals Limited'},
    {label: 'Square Textile Limited', value: 'Square Textile Limited'},
    {label: 'Square Informatix Limited', value: 'Square Informatix Limited'}
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      employeeId: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^(\+88)?01[3-9]\d{8}$/)  // Bangladesh mobile format
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const payload = this.signUpForm.value as User;

    this.authService.register(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: 'User created successfully.',
          life: 2500
        });

        this.signUpForm.reset();
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Signup Failed',
          detail: err?.error?.message || 'Something went wrong.',
          life: 3000
        });
      }
    });
  }
}

