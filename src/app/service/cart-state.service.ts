import {computed, Injectable, signal} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private _cartDialogVisible = signal<boolean>(false);

  cartDialogVisible = computed(() => this._cartDialogVisible())

  toggleCartDialog() {
    this._cartDialogVisible.update((visible) => !visible);
  }

  setCartDialogVisible(value: boolean) {
    this._cartDialogVisible.set(value);
  }

  private _openCartDialog$ = new Subject<void>();
  openCartDialog$ = this._openCartDialog$.asObservable();

  requestOpenCartDialog() {
    this._openCartDialog$.next();
  }
}
