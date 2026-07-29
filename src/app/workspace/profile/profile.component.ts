import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService, AuthUser} from '../../service/auth.service';
import {Router} from '@angular/router';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Divider],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: AuthUser | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/auth/login']);
        return;
      }
      this.user = user;
    });
  }
}
