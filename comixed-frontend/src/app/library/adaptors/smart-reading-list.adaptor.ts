/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2019, The ComiXed Project
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses>
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/library';
import {
  SMART_READING_LIST_FEATURE_KEY,
  SmartReadingListState
} from 'app/library/reducers/smart-reading-list.reducer';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
import {
  SmartReadingListCreate,
  SmartReadingListGet,
  SmartReadingListSave,
  SmartReadingListsLoad
} from 'app/library/actions/smart-reading-list.actions';
import { SmartReadingList } from 'app/library/models/smart-reading-list/smart-reading-list';
import { SmartReadingListEntry } from 'app/library/models/smart-reading-list/smart-reading-list-entry';

@Injectable()
export class SmartReadingListAdaptor {
  _updated$ = new BehaviorSubject<Date>(null);
  _smart_reading_list$ = new BehaviorSubject<SmartReadingList[]>([]);
  _smart_current_list$ = new BehaviorSubject<SmartReadingList>(null);

  constructor(private store: Store<AppState>) {
    this.store
      .select(SMART_READING_LIST_FEATURE_KEY)
      .pipe(filter(state => !!state))
      .subscribe((state: SmartReadingListState) => {
        if (!_.isEqual(this._smart_reading_list$.getValue(), state.reading_smart_lists)) {
          this._smart_reading_list$.next(state.reading_smart_lists);
        }
        if (!_.isEqual(this._smart_current_list$.getValue(), state.current_smart_list)) {
          this._smart_current_list$.next(state.current_smart_list);
        }
        this._updated$.next(new Date());
      });
  }

  get smart_reading_list$(): Observable<SmartReadingList[]> {
    return this._smart_reading_list$.asObservable();
  }

  get_smart_reading_lists(): void {
    this.store.dispatch(new SmartReadingListsLoad());
  }

  get smart_current_list$(): Observable<SmartReadingList> {
    return this._smart_current_list$.asObservable();
  }

  save(reading_smart_list: SmartReadingList, entries: SmartReadingListEntry[]): void {
    this.store.dispatch(
      new SmartReadingListSave({
        reading_smart_list: {
          ...reading_smart_list // ,
          // TODO Joao
          // entries: entries
        }
      })
    );
  }

  create_smart_reading_list() {
    this.store.dispatch(new SmartReadingListCreate());
  }

  get_smart_reading_list(id: number): void {
    this.store.dispatch(new SmartReadingListGet({ id: id }));
  }
}
