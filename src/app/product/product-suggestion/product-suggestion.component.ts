import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/services/product.service';
import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'nga-product-suggestion',
  templateUrl: './product-suggestion.component.html',
  styleUrls: ['./product-suggestion.component.scss']
})
export class ProductSuggestionComponent {

  @Input() products: Product[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 2],
    ['sm', 3],
    ['md', 5],
    ['lg', 2],
    ['xl', 3]
  ])

  constructor(private media: MediaObserver) {
    this.columns$ = this.media.media$.pipe(
      map(p => <number> this.breakpointsToColumnsNumber.get(p.mqAlias)),
      startWith(3)
    );
   }

}
