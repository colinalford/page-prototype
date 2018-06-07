import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface DataStoreEvent {
  type: string;
  payload: any;
}

export class DataStore {

  public state: Observable<any>;
  public events: Observable<any>;

  private _state: BehaviorSubject<any>;
  private _events: BehaviorSubject<DataStoreEvent>;

  public get currentState (): any {
    return this._state.getValue();
  }

  constructor (private _reducer, initialState) {
    // Initialize State
    this._state = new BehaviorSubject<any>(initialState);
    this.state = this._state.asObservable();

    // Initialize Events
    this._events = new BehaviorSubject<DataStoreEvent>(
      { type: 'init', payload: this._state.getValue() }
    );

    this.events = this._events.asObservable();
  }

  public update (event: DataStoreEvent) {
    // Update state based on action
    this._state.next(this._reducer(
      this._state.getValue(),
      event
    ));

    // Alert subscribers that an event has modified state
    this._events.next(event);
  }
}

function reduce (state: any, action: DataStoreEvent) {
  switch (action.type) {
    case 'FILTERS_CHANGED':
      return {
        ...state,
        filters: action.payload
      };
    case 'API_CALL':
      return {
        ...state,
        data: action.payload
      };
    case 'ERROR':
      console.log(action.payload);
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

export const initial = new DataStore(reduce, { filters: {} });
