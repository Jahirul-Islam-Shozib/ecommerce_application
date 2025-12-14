import {computed, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Product {
  _id: string;
  brand: string;
  weightValue: number;
  weightUnit: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'sq_employee_cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  private readonly baseUrl = 'http://localhost:3000/products';
  private popularProducts = signal<Product[]>([])

  private bestDealsProducts = signal<any[]>([
    {
      id: 11,
      brand: 'Chaka',
      weight: '1000 gm',
      name: 'Chaka Super white Premium Detergent powder',
      originalPrice: 120,
      discountedPrice: 110,
      imageUrl: 'assets/images/chaka-deal.png'
    },
    {
      id: 12,
      brand: 'Meril',
      weight: '150 ml',
      name: 'Meril Olive Oil',
      originalPrice: 420,
      discountedPrice: 320,
      imageUrl: 'assets/images/olive-oil-offer.png'
    },
    {
      id: 13,
      brand: 'White Plus',
      weight: '50 ml',
      name: 'White Plus Kids',
      originalPrice: 120,
      discountedPrice: 110,
      imageUrl: 'assets/images/white-plus-offer.png'
    }
  ])

  getPopularProducts = computed(() => this.popularProducts())
  getBestDealProducts = computed(() => this.bestDealsProducts())


  private cart = signal<CartItem[]>(this.loadCartFromStorage())
  getCart = computed(() => this.cart())
  getCartItemCount = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0))

  // ------------ CART PERSISTENCE HELPERS ---------------

  private loadCartFromStorage(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch (e) {
      console.warn('Failed to parse stored cart:', e);
      return [];
    }
  }

  private syncCartToStorage(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to storage:', e);
    }
  }


  // addToCart(product: Product) {
  //   this.cart.update(previousCart => {
  //     const existingItem = previousCart.find(item => item.product._id === product._id);
  //     if (existingItem) {
  //       return previousCart.map(item => item.product._id === product._id ? {
  //         ...item,
  //         quantity: item.quantity + 1
  //       } : item);
  //     } else {
  //       return [...previousCart, {product, quantity: 1}]
  //     }
  //   })
  // }
  //
  // decreaseFromCart(product: Product) {
  //   this.cart.update(previousCart =>
  //     previousCart
  //       .map(item =>
  //         item.product._id === product._id
  //           ? {...item, quantity: item.quantity - 1}
  //           : item
  //       )
  //       .filter(item => item.quantity > 0)
  //   );
  // }
  //
  // removeFromCart(product: Product) {
  //   this.cart.update(previousCart =>
  //     previousCart.filter(item => item.product._id !== product._id)
  //   );
  // }
  //
  // clearCart() {
  //   this.cart.set([]);
  // }

  addToCart(product: Product) {
    this.cart.update((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.product._id === product._id,
      );

      let updatedCart: CartItem[];
      if (existingItem) {
        updatedCart = previousCart.map((item) =>
          item.product._id === product._id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      } else {
        updatedCart = [...previousCart, {product, quantity: 1}];
      }

      this.syncCartToStorage(updatedCart);
      return updatedCart;
    });
  }

  decreaseFromCart(product: Product) {
    this.cart.update((previousCart) => {
      const updatedCart = previousCart
        .map((item) =>
          item.product._id === product._id
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter((item) => item.quantity > 0);

      this.syncCartToStorage(updatedCart);
      return updatedCart;
    });
  }

  removeFromCart(product: Product) {
    this.cart.update((previousCart) => {
      const updatedCart = previousCart.filter(
        (item) => item.product._id !== product._id,
      );
      this.syncCartToStorage(updatedCart);
      return updatedCart;
    });
  }

  clearCart() {
    const empty: CartItem[] = [];
    this.cart.set([]);
    this.syncCartToStorage([]); // 🔥 also clear from localStorage
  }

  getAllProducts(page?: number, size?: number, brands?: string[]): Observable<{ data: Product[], total: number }> {
    let params = new HttpParams()

    if (page !== undefined && size !== undefined) {
      params = params.set('page', page.toString()).set('size', size.toString());
    }

    return this.http.post<{ data: Product[], total: number }>(
      `http://localhost:3000/products/list`,
      {brands: brands ?? []},
      {params}
    );
  }

  getProductListById(id: string): Observable<{ data: Product[]; total: number }> {
    return this.http.get<{ data: Product[]; total: number }>(
      `${this.baseUrl}/${id}`
    );
  }

  // getAllPopularProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>('assets/data/popular-products.json');
  // }
}

