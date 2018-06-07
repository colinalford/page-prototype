import {
  Component,
  Input,
  AfterContentInit,
  ContentChildren,
  QueryList
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataStore } from '../../model/store';
import { DataSource } from '../../model/source';

@Component({
  selector: 'cc-filters',
  template: `
    <form [formGroup]="group">
      <ng-content></ng-content>
    </form>
  `
})
export class FiltersComponent implements AfterContentInit {
  @Input() public group: FormGroup;

  constructor (private _store: DataStore) {}

  public ngAfterContentInit () {
    // Initialize Filters in State with Filter Model
    // Throws error when suscribing if model doesn't match
    this._store.update(
      {
        type: 'FILTERS_CHANGED',
        payload: this.group.value
      }
    );

    // Subscribe to changes
    this._store.state.subscribe(
      (state) => {
        this.group.setValue(
          state.filters, { emitEvent: false }
        );
      }
    );

    this._store.events.subscribe(
      data => this.eventHandler(data)
    );

    // Update state store when form value changes
    this.group.valueChanges.subscribe(
      data => {
        if (data.second.length > 5) {
          this._store.update({type: 'ERROR', payload: null});
        } else {
          this._store.update(
            {
              type: 'FILTERS_CHANGED',
              payload: data
            }
          );
        }
      }
    );
  }

  public eventHandler (e) {
    switch (e.type) {
      default:
        return;
    }
  }
}
