import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectOption } from '../../../../shared/components/form-controls/select/select-option.interface';
import { SelectComponent } from '../../../../shared/components/form-controls/select/select.component';

@Component({
  selector: 'ish-select-language',
  templateUrl: '../../../../shared/components/form-controls/select/select.component.html'
})
export class SelectLanguageComponent extends SelectComponent implements OnInit {

  /*
    constructor
  */
  constructor(
    protected translate: TranslateService
  ) { super(translate); }

  /*
    on Init
  */
  ngOnInit() {
    this.setDefaultValues(); // call this method before parent init
    super.componentInit();
    this.options = this.options || this.getLanguageOptions();
  }

  /*
    set default values for empty input parameters
  */
  private setDefaultValues() {
    this.controlName = this.controlName || 'preferredLanguage';
    this.label = this.label || 'Preferred Language';      // ToDo: Translation key
    this.errorMessages = this.errorMessages || { 'required': 'Please select a preferred language' };  // ToDo: Translation key
  }

  /*
    get languages
    returns (SelectOption[]) - language options
  */
  private getLanguageOptions(): SelectOption[] {
    let options: SelectOption[] = [];
    const languages = this.getlanguages();  // ToDo: has to be done by a service

    if (languages) {
      // Map title array to an array of type SelectOption
      options = languages.map(language => {
        return {
          'label': language.name,
          'value': language.localeid
        };
      });
    }
    return options;
  }

  // define which security questions are shown - ToDo: should be done in a service
  private getlanguages() {
    return [
      { localeid: 'en_US', name: 'English (United States)' },
      { localeid: 'fr_FR', name: 'French (France)' },
      { localeid: 'de_DE', name: 'German (Germany)' }
    ];
  }
}
