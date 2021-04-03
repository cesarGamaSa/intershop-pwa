import { NgModule } from '@angular/core';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { IdentityProviderCapabilityDirective } from './directives/identity-provider-capability.directive';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import { ProductContextAccessDirective } from './directives/product-context-access.directive';
import { ProductContextDirective } from './directives/product-context.directive';
import { ProductListingContextDirective } from './directives/product-listing-context.directive';
import { ServerHtmlDirective } from './directives/server-html.directive';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    IdentityProviderCapabilityDirective,
    IntersectionObserverDirective,
    ProductContextAccessDirective,
    ProductContextDirective,
    ProductListingContextDirective,
    ServerHtmlDirective,
  ],
  exports: [
    ClickOutsideDirective,
    IdentityProviderCapabilityDirective,
    IntersectionObserverDirective,
    ProductContextAccessDirective,
    ProductContextDirective,
    ProductListingContextDirective,
    ServerHtmlDirective,
  ],
})
export class DirectivesModule {}
