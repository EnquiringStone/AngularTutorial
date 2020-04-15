import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from 'src/app/shared/services/product.service';
import { MediaObserver } from '@angular/flex-layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nga-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {

  readonly columns$: Observable<number>;
  @Input() readonly products: Product[];

  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 3],
    ['lg', 4],
    ['xl', 5]
  ]);

  constructor(private media: MediaObserver) {
    this.columns$ = this.media.media$.pipe(
      map(p => <number> this.breakpointsToColumnsNumber.get(p.mqAlias))
    );
   }
}
