import { Route } from '@angular/router';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';
import { ProductResolverService } from './shared/services/product-resolver.service';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => HomeModule
  },
  {
    path: 'products/:productId',
    loadChildren: () => ProductModule,
    resolve: {product: ProductResolverService}
  }
];
