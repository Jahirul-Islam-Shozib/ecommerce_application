import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../models/User";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
}

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
  private readonly baseUrl = `${environment.API_BASE_URL}/auth`;

  private currentUserSubject = new BehaviorSubject<AuthUser | null>(this.loadInitialUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  login(identifier: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, {identifier, password})
      .pipe(
        tap(res => {
          const user = res.data.user;
          const token = res.data.token;

          this.currentUserSubject.next(user);
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', token);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}).pipe(
      tap({
        next: () => this.clearSession(),
        error: () => this.clearSession()
      })
    );
  }

  private clearSession(): void {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('token');
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
