import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataStore } from '../../model/store';

@Component({
  selector: 'cc-filter-drawer',
  styles: [
    `
      .filter-pill {
        padding: .25em;
        margin: 1em;
        border: 1px solid black;
        background-color: #F1F1F1;
      }
    `
  ],
  template: `
    <p>
      Active Filters:
      <span class="filter-pill"
        *ngFor="let filter of filters | async">
        {{filter.value}}
        <button (click)="clear(filter)">X</button>
      </span>
    </p>
    <ng-content></ng-content>
  `
})
export class FilterDrawerComponent {

  public get filters () {
    return this._store.state.pipe(
      map(
        (data: any) => Object
          .keys(data.filters)
          .map(
            function (key) {
              return {
                key: key,
                value: data.filters[key]
              };
            }
          )
      )
    );
  }

  constructor (private _store: DataStore) {}

  public clear (filter) {
    const oldVal = this._store.currentState.filters;

    const newVal = {};
    newVal[filter.key] = '';

    this._store.update(
      {
        type: 'FILTERS_CHANGED',
        payload: {
          ...oldVal,
          ...newVal
        }
      }
    );
  }
}
