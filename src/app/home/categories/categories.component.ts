import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'nga-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  readonly categoryNames$: Observable<string[]>;
  readonly products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {
      this.categoryNames$ = this.productService.getDistinctCategories().pipe(
        map(categories => ['all', ...categories])
      );
      this.products$ = this.route.params.pipe(
        switchMap(({category}) => this.getCategory(category))
      );
    }

  private getCategory(category: string): Observable<Product[]> {
    return category.toLowerCase() === 'all' ?
      this.productService.getAll() :
      this.productService.getByCategory(category.toLowerCase());
  }
}
