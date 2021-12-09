import { ChangeDetectorRef, Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { FeatureToggleService } from 'ish-core/utils/feature-toggle/feature-toggle.service';

/**
 * Structural directive.
 * Used on an element, this element will only be rendered if the specified feature *is enabled*.
 *
 * For the negated case see {@link NotFeatureToggleDirective}.
 * For the corresponding pipe see {@link FeatureTogglePipe}.
 *
 * @example
 * <div *ishFeature="'quoting'">
 *   Only visible when quoting is enabled by configuration.
 * </div>
 */
@Directive({
  selector: '[ishFeature]',
})
export class FeatureToggleDirective implements OnDestroy {
  @Input() ishFeatureElse: TemplateRef<unknown>;

  private subscription: Subscription;
  private enabled$ = new BehaviorSubject<boolean>(undefined);

  private destroy$ = new Subject();

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private featureToggle: FeatureToggleService,
    private cdRef: ChangeDetectorRef
  ) {
    this.enabled$
      .pipe(
        distinctUntilChanged(),
        filter(val => typeof val === 'boolean'),
        takeUntil(this.destroy$)
      )
      .subscribe(enabled => {
        this.viewContainer.clear();
        if (enabled) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else if (this.ishFeatureElse) {
          this.viewContainer.createEmbeddedView(this.ishFeatureElse);
        }
        this.cdRef.markForCheck();
      });
  }

  @Input() set ishFeature(feature: string) {
    // end previous subscription and newly subscribe
    if (this.subscription) {
      // tslint:disable-next-line: ban
      this.subscription.unsubscribe();
    }

    this.subscription = this.featureToggle
      .enabled(feature)
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: val => this.enabled$.next(val) });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
