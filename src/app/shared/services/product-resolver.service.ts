import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Product, ProductService } from './product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductResolverService implements Resolve<Product> {

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Product> {
    let id = Number(route.paramMap.get('productId'));

    return this.productService.getById(id).pipe(
      map(product => {
        if (product) {
          return product;
        }
        else{
          let snackBarComponent = this.snackBar.open('Product with id ' + id + ' does not exist.', 'Bring me back', {
            duration: 5000,
            verticalPosition: "bottom"
          });

          snackBarComponent.afterDismissed().subscribe(dismissed => {
            if (dismissed.dismissedByAction) {
              this.router.navigate(['/']);
            }
          });

          return null;
        }
      })
    )
  }
}
