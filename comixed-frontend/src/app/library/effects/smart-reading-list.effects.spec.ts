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

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { SmartReadingListEffects } from './smart-reading-list.effects';
import { SmartReadingListService } from 'app/library/services/smart-reading-list.service';
import { SMART_READING_LIST_1 } from 'app/library/models/smart-reading-list/smart-reading-list.fixtures';
import {
  SmartReadingListGet,
  SmartReadingListGetFailed,
  SmartReadingListLoadFailed,
  SmartReadingListReceived,
  SmartReadingListSave,
  SmartReadingListSaved,
  SmartReadingListSaveFailed,
  SmartReadingListsLoad,
  SmartReadingListsLoaded
} from 'app/library/actions/smart-reading-list.actions';
import { hot } from 'jasmine-marbles';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;
import { HttpErrorResponse } from '@angular/common/http';

describe('SmartReadingListEffects', () => {
  const SMART_READING_LISTS = [SMART_READING_LIST_1];

  let actions$: Observable<any>;
  let effects: SmartReadingListEffects;
  let smart_reading_list_service: jasmine.SpyObj<SmartReadingListService>;
  let message_service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        SmartReadingListEffects,
        provideMockActions(() => actions$),
        {
          provide: SmartReadingListService,
          useValue: {
            get_all: jasmine.createSpy('SmartReadingListService.get_all'),
            get_reading_list: jasmine.createSpy(
              'SmartReadingListService.get_smart_reading_list'
            ),
            save_reading_list: jasmine.createSpy(
              'SmartReadingListService.saveSmartReadingList'
            )
          }
        },
        MessageService
      ]
    });

    effects = TestBed.get(SmartReadingListEffects);
    smart_reading_list_service = TestBed.get(SmartReadingListService);
    message_service = TestBed.get(MessageService);
    spyOn(message_service, 'add');
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('when getting all reading lists', () => {
    it('fires an action on success', () => {
      const service_response = SMART_READING_LISTS;
      const action = new SmartReadingListsLoad();
      const outcome = new SmartReadingListsLoaded({ reading_smart_lists: SMART_READING_LISTS });

      actions$ = hot('-a', { a: action });
      smart_reading_list_service.get_all.and.returnValue(of(service_response));

      const expected = hot('-b', { b: outcome });
      expect(effects.get_all$).toBeObservable(expected);
      expect(message_service.add).toHaveBeenCalledWith(
        objectContaining({ severity: 'info' })
      );
    });

    it('fires an action on service failure', () => {
      const service_response = new HttpErrorResponse({});
      const action = new SmartReadingListsLoad();
      const outcome = new SmartReadingListLoadFailed();

      actions$ = hot('-a', { a: action });
      smart_reading_list_service.get_all.and.returnValue(
        throwError(service_response)
      );

      const expected = hot('-b', { b: outcome });
      expect(effects.get_all$).toBeObservable(expected);
      expect(message_service.add).toHaveBeenCalledWith(
        objectContaining({ severity: 'error' })
      );
    });

    it('fires an action on general failure', () => {
      const action = new SmartReadingListsLoad();
      const outcome = new SmartReadingListLoadFailed();

      actions$ = hot('-a', { a: action });
      smart_reading_list_service.get_all.and.throwError('expected');

      const expected = hot('-(b|)', { b: outcome });
      expect(effects.get_all$).toBeObservable(expected);
      expect(message_service.add).toHaveBeenCalledWith(
        objectContaining({ severity: 'error' })
      );
    });
  });

  describe('when getting a single reading list', () => {
    it('fires an action on success', () => {
      const service_response = SMART_READING_LIST_1;
      const action = new SmartReadingListGet({ id: SMART_READING_LIST_1.id });
      const outcome = new SmartReadingListReceived({ reading_smart_list: SMART_READING_LIST_1 });

      actions$ = hot('-a', { a: action });
      smart_reading_list_service.get_smart_reading_list.and.returnValue(
        of(service_response)
      );

      const expected = hot('-b', { b: outcome });
      expect(effects.get_smart_reading_list$).toBeObservable(expected);
      expect(message_service.add).toHaveBeenCalledWith(
        objectContaining({ severity: 'info' })
      );
    });

    it('fires an action on service failure', () => {
      const service_response = new HttpErrorResponse({});
      const action = new SmartReadingListGet({ id: SMART_READING_LIST_1.id });
      const outcome = new SmartReadingListGetFailed();

      actions$ = hot('-a', { a: action });
      smart_reading_list_service.get_smart_reading_list.and.returnValue(
        throwError(service_response)
      );

      const expected = hot('-b', { b: outcome });
      expect(effects.get_smart_reading_list$).toBeObservable(expected);
      expect(message_service.add).toHaveBeenCalledWith(
        objectContaining({ severity: 'error' })
      );
    });

    it('fires an action on general failure', () => {
      const action = new SmartReadingListGet({ id: SMART_READING_LIST_1.id });
      const outcome = new SmartReadingListGetFailed();

      actions$ = hot('-a', { a: action });
      smart_reading_list_service.get_smart_reading_list.and.throwError('expected');

      const expected = hot('-(b|)', { b: outcome });
      expect(effects.get_smart_reading_list$).toBeObservable(expected);
      expect(message_service.add).toHaveBeenCalledWith(
        objectContaining({ severity: 'error' })
      );
    });
  });

  describe('when saving a reading list', () => {
    it('fires an action on success', () => {
      const service_response = SMART_READING_LIST_1;
      const action = new SmartReadingListSave({ reading_smart_list: SMART_READING_LIST_1 });
      const outcome = new SmartReadingListSaved({ reading_smart_list: SMART_READING_LIST_1 });

      actions$ = hot('-a', { a: action });
      smart_reading_list_service.save_smart_reading_list.and.returnValue(
        of(service_response)
      );

      const expected = hot('-b', { b: outcome });
      expect(effects.save_smart_reading_list$).toBeObservable(expected);
      expect(message_service.add).toHaveBeenCalledWith(
        objectContaining({ severity: 'info' })
      );
    });

    it('fires an action on service failure', () => {
      const service_response = new HttpErrorResponse({});
      const action = new SmartReadingListSave({ reading_smart_list: SMART_READING_LIST_1 });
      const outcome = new SmartReadingListSaveFailed();

      actions$ = hot('-a', { a: action });
      smart_reading_list_service.save_smart_reading_list.and.returnValue(
        throwError(service_response)
      );

      const expected = hot('-b', { b: outcome });
      expect(effects.save_smart_reading_list$).toBeObservable(expected);
      expect(message_service.add).toHaveBeenCalledWith(
        objectContaining({ severity: 'error' })
      );
    });

    it('fires an action on general failure', () => {
      const action = new SmartReadingListSave({ reading_smart_list: SMART_READING_LIST_1 });
      const outcome = new SmartReadingListSaveFailed();

      actions$ = hot('-a', { a: action });
      smart_reading_list_service.save_smart_reading_list.and.throwError('expected');

      const expected = hot('-(b|)', { b: outcome });
      expect(effects.save_smart_reading_list$).toBeObservable(expected);
      expect(message_service.add).toHaveBeenCalledWith(
        objectContaining({ severity: 'error' })
      );
    });
  });
});
