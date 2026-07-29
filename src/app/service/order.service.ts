import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {environment} from "../../environments/environment";
import {OrderPayload} from "../models/order";

export interface PaginatedResponse<T> {
  data: T[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable({providedIn: 'root'})
export class OrdersService {
  private readonly baseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) {
  }

  /**
   * GET /orders?page=&limit=&employeeId=&orderId=
   */
  getOrderList(
    page: number = 1,
    size: number = 10,
    body?: {
      status?: 'All' | 'Pending' | 'Confirmed' | 'Delivered' | 'Cancel';
      employeeId?: string;
      orderId?: string;
    },
  ): Observable<{ data: OrderPayload[]; total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.post<any>(
      `${this.baseUrl}/orders/list`,
      body ?? {status: 'All'},
      {params},
    ).pipe(
      map(res => ({
        data: res.data ?? [],
        total: res.meta?.total ?? 0
      }))
    );
  }

  createOrder(payload: any) {
    return this.http.post(
      `${this.baseUrl}/orders`,
      payload
    );
  }
}
