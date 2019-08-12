import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { debounce, map, switchMap } from 'rxjs/operators';

import { getProductListingLoading, getProductListingView } from 'ish-core/store/shopping/product-listing';
import { getSearchTerm } from 'ish-core/store/shopping/search';
import { whenFalsy } from 'ish-core/utils/operators';

@Component({
  selector: 'ish-search-page-container',
  templateUrl: './search-page.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageContainerComponent {
  searchTerm$ = this.store.pipe(select(getSearchTerm));
  numberOfItems$ = this.searchTerm$.pipe(
    debounce(() =>
      this.store.pipe(
        select(getProductListingLoading),
        whenFalsy()
      )
    ),
    switchMap(term =>
      this.store.pipe(
        select(getProductListingView, { type: 'search', value: term }),
        map(view => view.itemCount)
      )
    )
  );
  searchLoading$ = this.store.pipe(select(getProductListingLoading));

  constructor(private store: Store<{}>) {}
}
