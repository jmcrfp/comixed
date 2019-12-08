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
 * along with this program. If not, see <http:/www.gnu.org/licenses>
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  SmartReadingListActions,
  SmartReadingListActionTypes,
  SmartReadingListGet,
  SmartReadingListGetFailed,
  SmartReadingListLoadFailed,
  SmartReadingListReceived,
  SmartReadingListSave,
  SmartReadingListSaved,
  SmartReadingListSaveFailed,
  SmartReadingListsLoaded
} from '../actions/smart-reading-list.actions';
import { SmartReadingListService } from 'app/library/services/smart-reading-list.service';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { SmartReadingList } from 'app/library/models/smart-reading-list/smart-reading-list';

@Injectable()
export class SmartReadingListEffects {
  constructor(
    private actions$: Actions<SmartReadingListActions>,
    private smart_reading_list_service: SmartReadingListService,
    private translate_service: TranslateService,
    private message_service: MessageService
  ) {}

  @Effect()
  get_all$: Observable<Action> = this.actions$.pipe(
    ofType(SmartReadingListActionTypes.LoadSmartReadingLists),
    switchMap(action =>
      this.smart_reading_list_service.get_all().pipe(
        tap((response: SmartReadingList[]) =>
          this.message_service.add({
            severity: 'info',
            detail: this.translate_service.instant(
              'smart-reading-list-effects.get-all.success.detail',
              { count: response.length }
            )
          })
        ),
        map(
          (response: SmartReadingList[]) =>
            new SmartReadingListsLoaded({ reading_smart_lists: response })
        ),
        catchError(error => {
          this.message_service.add({
            severity: 'error',
            detail: this.translate_service.instant(
              'smart-reading-list-effects.get-all.error.detail'
            )
          });
          return of(new SmartReadingListLoadFailed());
        })
      )
    ),
    catchError(error => {
      this.message_service.add({
        severity: 'error',
        detail: this.translate_service.instant(
          'general-message.error.general-service-failure'
        )
      });
      return of(new SmartReadingListLoadFailed());
    })
  );

  @Effect()
  get_smart_reading_list$: Observable<Action> = this.actions$.pipe(
    ofType(SmartReadingListActionTypes.GetSmartReadingList),
    map((action: SmartReadingListGet) => action.payload),
    switchMap(action =>
      this.smart_reading_list_service.get_smart_reading_list(action.id).pipe(
        tap((response: SmartReadingList) =>
          this.message_service.add({
            severity: 'info',
            detail: this.translate_service.instant(
              'smart-reading-list-effects.get-smart-reading-list.success.detail',
              { name: response.name }
            )
          })
        ),
        map(
          (response: SmartReadingList) =>
            new SmartReadingListReceived({ reading_smart_list: response })
        ),
        catchError(error => {
          this.message_service.add({
            severity: 'error',
            detail: this.translate_service.instant(
              'smart-reading-list-effects.get-smart-reading-list.error.detail'
            )
          });
          return of(new SmartReadingListGetFailed());
        })
      )
    ),
    catchError(error => {
      this.message_service.add({
        severity: 'error',
        detail: this.translate_service.instant(
          'general-message.error.general-service-failure'
        )
      });
      return of(new SmartReadingListGetFailed());
    })
  );

  @Effect()
  save_smart_reading_list$: Observable<Action> = this.actions$.pipe(
    ofType(SmartReadingListActionTypes.SaveSmartReadingList),
    map((action: SmartReadingListSave) => action.payload),
    switchMap(action =>
      this.smart_reading_list_service.save_smart_reading_list(action.reading_smart_list).pipe(
        tap((response: SmartReadingList) =>
          this.message_service.add({
            severity: 'info',
            detail: this.translate_service.instant(
              'smart-reading-list-effects.save.success.detail',
              { name: response.name }
            )
          })
        ),
        map(
          (response: SmartReadingList) =>
            new SmartReadingListSaved({ reading_smart_list: response })
        ),
        catchError(error => {
          this.message_service.add({
            severity: 'error',
            detail: this.translate_service.instant(
              'smart-reading-list-effects.save.error.detail'
            )
          });
          return of(new SmartReadingListSaveFailed());
        })
      )
    ),
    catchError(error => {
      this.message_service.add({
        severity: 'error',
        detail: this.translate_service.instant(
          'general-message.error.general-service-failure'
        )
      });
      return of(new SmartReadingListSaveFailed());
    })
  );
}
