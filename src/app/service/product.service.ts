import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  productName: string;
  productImage: string;
  productWeight: string; // updated from productQuantity
  productPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {
    console.log(this.firestore)
  }

  getAllProducts(): Observable<Product[]> {
    const productRef = collection(this.firestore, `products/1`);
    console.log(productRef)
    return collectionData(productRef, { idField: 'id' }) as Observable<Product[]>;
  }
}
