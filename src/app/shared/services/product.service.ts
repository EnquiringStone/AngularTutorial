import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, distinct } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
}

export interface ProductSearchParams {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json');
  }

  getById(productId: number): Observable<Product> {
    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        map(products => <Product> products.find(p => p.id === productId))
      )
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        map(products => products.filter(product => product.categories.includes(category))
      ));
  }

  getDistinctCategories(): Observable<string[]> {
    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        map(this.concatCategories),
        map(categories => Array.from(new Set(categories)))
      );
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        map(products => {
          return this.filterProducts(products, params);
        })
      )
  }

  private concatCategories(products: Product[]): string[] {
    return products.reduce((all, product) => all.concat(product.categories), new Array<string>());
  }

  private filterProducts(products: Product[], params: ProductSearchParams): Product[] {
    return products
      .filter(product => params.title ? product.title.toLowerCase() === params.title.toLowerCase() : products)
      .filter(product => params.minPrice ? product.price >= params.minPrice : products)
      .filter(product => params.maxPrice ? product.price <= params.maxPrice : products);
  }
}
