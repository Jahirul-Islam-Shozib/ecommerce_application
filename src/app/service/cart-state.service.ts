import {computed, Injectable, signal} from '@angular/core';

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
}
