import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputText} from "primeng/inputtext";
import {Password} from "primeng/password";
import {MessageService} from "primeng/api";
import {Toast} from "primeng/toast";
import {AuthService, AuthUser} from "../../service/auth.service";
import {User} from "../../models/User";

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
    Password,
    Toast
  ],
  providers: [MessageService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  redirectUrl: string | null = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private authService: AuthService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl');

    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { identifier, password } = this.loginForm.value;

    this.authService.login(identifier, password).subscribe({
      next: (user: AuthUser) => {
        // OPTIONAL: if you want to store logged-in user:
        // localStorage.setItem('currentUser', JSON.stringify(user));

        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: `Welcome, ${user.name}`,
          life: 2000
        });

        const target = this.redirectUrl || '/';
        this.router.navigateByUrl(target);
      },
      error: (err) => {
        console.error('Login error', err);

        const detail =
          err?.error?.message ||
          'Invalid phone/email or password. Please try again.';

        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail,
          life: 3000
        });
      }
    });
  }
}
