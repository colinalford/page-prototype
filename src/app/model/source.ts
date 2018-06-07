import { DataStoreEvent, DataStore } from './store';

/**
 * Example implementation of a data source that subscribes
 * to events and calls side effects when the Data Store
 * state is updated
 */
export class DataSource {
  constructor (private _store: DataStore) {
    this._store.events.subscribe(
      data => this.eventHandler(data)
    );
  }

  public eventHandler (e: DataStoreEvent) {
    switch (e.type) {
      case 'FILTERS_CHANGED':
        this._store.update({type: 'API_CALL', payload: {results: 500}});
        return;
      default:
        return;
    }
  }
}
