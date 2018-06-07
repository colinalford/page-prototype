import { Component } from '@angular/core';
import { DataStore } from '../../model/store';

@Component({
  selector: 'cc-layout',
  template: `
    <ng-content></ng-content>
    <h2>{{ data | async | json }}</h2>
  `
})
export class LayoutComponent {
  public get data () {
    return this._store.state;
  }
  constructor (private _store: DataStore) {}
}
