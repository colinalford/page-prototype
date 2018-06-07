import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataStore, DataStoreEvent } from './model/store';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {

  public filters: FormGroup;
  public data: Observable<any>;

  constructor (private _builder: FormBuilder,
    private _store: DataStore) {
    this.filters = this._builder.group({
      first: [''],
      second: [''],
      third: ['']
    });
  }

  public ngAfterContentInit () {
    this._store.events.subscribe(
      data => this.handleEvents(data),
      err => this.handleEvents(err)
    );

    this.data = this._store.state
      .pipe(
        map(
          (data: any) => data.data
        )
      );
  }

  public handleEvents (e: DataStoreEvent) {
    switch (e.type) {
      case 'FILTERS_CHANGED':
        const second = this._store.currentState.filters.second;
        const third = this._store.currentState.filters.third || 1;
        let promise;
        if (second === 'error') {
          promise = fetch(`https://jsonplaceholder.tyupicode.com/postzs/lalalala`);
        } else {
          promise = fetch(`https://jsonplaceholder.typicode.com/posts/${third}`);
        }
        promise
          .then(response => response.json())
          .then(
            json => {
              this._store.update(
                { type: 'API_CALL', payload: { data: json } }
              );
            }
          )
          .catch(err => {
            this._store.update({ type: 'ERROR', payload: { data: {error: err.toString()} }});
          }
          );
        return;
      default:
        return;
    }
  }

}
