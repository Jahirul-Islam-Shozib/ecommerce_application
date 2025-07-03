import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {Password} from "primeng/password";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputGroup,
    InputGroupAddon,
    InputText,
    NgIf,
    Password,
    RouterLink
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      console.log('Form Submitted ✅', this.passwordForm.value);
      // call API here
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
