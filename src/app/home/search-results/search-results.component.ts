import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'nga-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  readonly products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.products$ = this.route.queryParams.pipe(
      switchMap(params => this.productService.search(params))
    );
  }
}
