import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


export interface SendEmailPayload {
  from?: string;
  to: string;
  cc?: string[];
  bcc?: string[];
  subject: string;
  text: string;
  html?: string;
  process_now?: boolean;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationMailService {

  private readonly baseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) {
  }

  sendEmail(payload: SendEmailPayload): Observable<SendEmailResponse> {
    return this.http.post<SendEmailResponse>(
      `${this.baseUrl}/notifications/send-email`,
      payload
    );
  }
}
