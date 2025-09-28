import {computed, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AllProduct} from "../models/product";

export interface Product {
  id: number;
  brand: string;
  weight: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  private popularProducts = signal<Product[]>([
    {
      "id": 1,
      "brand": "MAYA",
      "name": "MAYA Marula Moisturizing & Glowing Cream",
      "weight": "50 ml",
      "originalPrice": 120,
      "discountedPrice": 110,
      "imageUrl": "assets/images/maya/Maya-Marula-Cream-Product-img.png"
    },
    {
      "id": 2,
      "brand": "Maxclean",
      "name": "Maxclean Liquid Dishwash",
      "weight": "75 ml",
      "originalPrice": 120,
      "discountedPrice": 110,
      "imageUrl": "assets/images/max-clean.png"
    },
    {
      "id": 3,
      "brand": "Revive",
      "name": "Revive Daily Moisturizer Sunscreen",
      "weight": "50 ml",
      "originalPrice": 800,
      "discountedPrice": 750,
      "imageUrl": "assets/images/revive.png"
    },
    {
      "id": 4,
      "brand": "MAYA",
      "name": "MAYA Rosehip Oil & Acne Control Gel Cream",
      "weight": "50 ml",
      "originalPrice": 350,
      "discountedPrice": 320,
      "imageUrl": "assets/images/maya/Maya-Rosehip-Cream-Product-img.png"
    },
    {
      "id": 5,
      "brand": "Meril",
      "name": "Meril Vitamin C Soap Bar - Lemon & Lime",
      "weight": "100 gm",
      "originalPrice": 45,
      "discountedPrice": 45,
      "imageUrl": "assets/images/meril/meril-baby/meril-vitamin-c-soap-bar.png"
    },
    {
      "id": 6,
      "brand": "Sepnil",
      "name": "Sepnil Natural Sanitizing Handwash - Magnolia",
      "weight": "200 ml",
      "originalPrice": 120,
      "discountedPrice": 120,
      "imageUrl": "assets/images/sepnil-magnolia.png"
    },
    {
      "id": 7,
      "brand": "White Plus",
      "name": "White-plus Toothpaste",
      "weight": "100 gm",
      "originalPrice": 275,
      "discountedPrice": 230,
      "imageUrl": "assets/images/white-plus.png"
    },
    {
      "id": 8,
      "brand": "Chaka",
      "name": "Chaka Advance White Ball Soap",
      "weight": "130 gm",
      "originalPrice": 50,
      "discountedPrice": 50,
      "imageUrl": "assets/images/chaka-powder.png"
    }
  ])

  private bestDealsProducts = signal<Product[]>([
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


  private cart = signal<CartItem[]>([])
  getCart = computed(() => this.cart())
  getCartItemCount = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0))


  addToCart(product: Product) {
    console.log(product)
    this.cart.update(previousCart => {
      const existingItem = previousCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return previousCart.map(item => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      } else {
        return [...previousCart, {product, quantity: 1}]
      }
    })
  }

  decreaseFromCart(product: Product) {
    this.cart.update(previousCart =>
      previousCart
        .map(item =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity - 1}
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  removeFromCart(product: Product) {
    this.cart.update(previousCart =>
      previousCart.filter(item => item.product.id !== product.id)
    );
  }

  clearCart() {
    this.cart.set([]);
  }

  getAllProducts(page: number = 1, size: number = 28): Observable<{ data: Product[], total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<{ data: Product[], total: number }>(
      'http://localhost:3000/products',
      { params }
    );
  }

  // getAllPopularProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>('assets/data/popular-products.json');
  // }
}

