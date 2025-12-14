import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../models/User";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

export interface AuthUser {
  _id: string;
  name: string;
  company: string;
  employeeId: string | number;
  department: string;
  designation?: string | null;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/users'; // ✅ Nest users controller

  // 🔥 central auth state
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(this.loadInitialUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  // 🔥 login with phone/email + password
  // login(identifier: string, password: string): Observable<User> {
  //   return this.http.post<User>(`${this.baseUrl}/login`, {identifier, password});
  // }

  login(identifier: string, password: string): Observable<AuthUser> {
    return this.http
      .post<AuthUser>(`${this.baseUrl}/login`, { identifier, password })
      .pipe(
        tap(user => {
          // 🔒 keep in memory
          this.currentUserSubject.next(user);
          // optional: light persistence (no password, just profile)
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('currentUser');
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  private loadInitialUser(): AuthUser | null {
    const saved = sessionStorage.getItem('currentUser');
    if (!saved) return null;

    try {
      return JSON.parse(saved) as AuthUser;
    } catch {
      sessionStorage.removeItem('currentUser');
      return null;
    }
  }
}
