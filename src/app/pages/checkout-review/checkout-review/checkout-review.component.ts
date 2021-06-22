import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { Basket } from 'ish-core/models/basket/basket.model';
import { HttpError } from 'ish-core/models/http-error/http-error.model';
import { markAsDirtyRecursive } from 'ish-shared/forms/utils/form-utils';

@Component({
  selector: 'ish-checkout-review',
  templateUrl: './checkout-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutReviewComponent implements OnInit {
  @Input() basket: Basket;
  @Input() error: HttpError;
  @Input() submitting: boolean;
  @Output() createOrder = new EventEmitter<void>();

  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};

  model = { termsAndConditions: false };

  submitted = false;
  multipleBuckets = false;

  ngOnInit() {
    this.multipleBuckets = !this.basket?.commonShippingMethod;

    this.fields = this.setFields();
  }

  /**
   * sends an event to submit order
   */
  submitOrder() {
    if (this.form.invalid) {
      this.submitted = true;
      markAsDirtyRecursive(this.form);
      return;
    }
    this.createOrder.emit();
  }

  private setFields() {
    return [
      {
        type: 'ish-checkout-review-tac-field',
        key: 'termsAndConditions',
        templateOptions: {
          label: 'checkout.tac.text',
          args: { 0: 'page://page.termsAndConditions.pagelet2-Page' },
          validation: {
            show: true,
          },
        },
        validators: {
          validation: [Validators.pattern('true')],
        },
        validation: {
          messages: {
            pattern: 'checkout.tac.error.tip',
          },
        },
      },
    ];
  }

  get formDisabled() {
    return (this.form.invalid && this.submitted) || this.multipleBuckets;
  }
}
