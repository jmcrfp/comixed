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

import {
  initial_state,
  SmartReadingListState,
  reducer
} from './smart-reading-list.reducer';
import {
  SmartReadingListCreate,
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
import { reading_smart_list_1 } from 'app/library/models/smart-reading-list/smart-reading-list.fixtures';
import { SmartReadingList } from 'app/library/models/smart-reading-list/smart-reading-list';

describe('SmartReadingList Reducer', () => {
  const reading_smart_lists = [reading_smart_list_1];

  let state: SmartReadingListState;

  beforeEach(() => {
    state = initial_state;
  });

  describe('the initial state', () => {
    beforeEach(() => {
      state = reducer(state, {} as any);
    });

    it('clears the loading smart reading lists flag', () => {
      expect(state.fetching_smart_lists).toBeFalsy();
    });

    it('has an empty set of smart reading lists', () => {
      expect(state.reading_smart_lists).toEqual([]);
    });

    it('clears the fetching smart list flag', () => {
      expect(state.fetching_smart_list).toBeFalsy();
    });

    it('does not have a smart current list', () => {
      expect(state.current_smart_list).toBeNull();
    });

    it('clears the saving smart reading list flag', () => {
      expect(state.saving_reading_smart_list).toBeFalsy();
    });

    it('clears the saving failed flag', () => {
      expect(state.saving_reading_smart_list_failed).toBeFalsy();
    });
  });

  describe('getting the set of smart reading lists', () => {
    beforeEach(() => {
      state = reducer(
        { ...state, fetching_smart_lists: false },
        new SmartReadingListsLoad()
      );
    });

    it('sets the loading smart reading lists flag', () => {
      expect(state.fetching_smart_lists).toBeTruthy();
    });
  });

  describe('when the smart reading lists are received', () => {
    beforeEach(() => {
      state = reducer(
        { ...state, fetching_smart_lists: true, reading_smart_lists: [] },
        new SmartReadingListsLoaded({ reading_smart_lists: reading_smart_lists })
      );
    });

    it('clears the fetching smart lists flag', () => {
      expect(state.fetching_smart_lists).toBeFalsy();
    });

    it('sets the smart reading lists', () => {
      expect(state.reading_smart_lists).toEqual(reading_smart_lists);
    });
  });

  describe('when getting the smart reading lists failed', () => {
    beforeEach(() => {
      state = reducer(
        { ...state, fetching_smart_lists: true },
        new SmartReadingListLoadFailed()
      );
    });

    it('clears the fetching smart lists flag', () => {
      expect(state.fetching_smart_lists).toBeFalsy();
    });
  });

  describe('when getting a smart reading list', () => {
    beforeEach(() => {
      state = reducer(
        { ...state, fetching_smart_list: false },
        new SmartReadingListGet({ id: reading_smart_list_1.id })
      );
    });

    it('sets the fetching smart list flag', () => {
      expect(state.fetching_smart_list).toBeTruthy();
    });
  });

  describe('when the smart reading list is received', () => {
    beforeEach(() => {
      state = reducer(
        { ...state, fetching_smart_list: true, current_smart_list: null },
        new SmartReadingListReceived({ reading_smart_list: reading_smart_list_1 })
      );
    });

    it('clears the fetching smart list flag', () => {
      expect(state.fetching_smart_list).toBeFalsy();
    });

    it('sets the smart current list', () => {
      expect(state.current_smart_list).toEqual(reading_smart_list_1);
    });
  });

  describe('when getting the smart reading list fails', () => {
    beforeEach(() => {
      state = reducer(
        { ...state, fetching_smart_list: true },
        new SmartReadingListGetFailed()
      );
    });

    it('clears the fetching smart list flag', () => {
      expect(state.fetching_smart_list).toBeFalsy();
    });
  });

  describe('when creating a new smart reading list', () => {
    beforeEach(() => {
      state = reducer(
        { ...state, current_smart_list: reading_smart_list_1 },
        new SmartReadingListCreate()
      );
    });

    it('sets a default smart reading list as the current one', () => {
      expect(state.current_smart_list).toEqual({} as SmartReadingList);
    });
  });

  describe('when saving a smart reading list', () => {
    beforeEach(() => {
      state = reducer(
        { ...state, saving_reading_smart_list: false },
        new SmartReadingListSave({ reading_smart_list: reading_smart_list_1 })
      );
    });

    it('sets the saving flag', () => {
      expect(state.saving_reading_smart_list).toBeTruthy();
    });
  });

  describe('when the smart reading list is saved', () => {
    const UPDATED_SMART_LIST = {
      ...reading_smart_lists[0],
      summary: 'This is the updated summary'
    };

    beforeEach(() => {
      state = reducer(
        {
          ...state,
          reading_smart_lists: reading_smart_lists,
          saving_reading_smart_list: true,
          saving_reading_smart_list_failed: true,
          current_smart_list: null
        },
        new SmartReadingListSaved({ reading_smart_list: UPDATED_SMART_LIST })
      );
    });

    it('clears the saving smart reading list flag', () => {
      expect(state.saving_reading_smart_list).toBeFalsy();
    });

    it('clears the saving smart reading list failed flag', () => {
      expect(state.saving_reading_smart_list_failed).toBeFalsy();
    });

    it('replaces the smart list in the set', () => {
      expect(state.reading_smart_lists).not.toContain(reading_smart_lists[0]);
      expect(state.reading_smart_lists).toContain(UPDATED_SMART_LIST);
    });

    it('sets the smart reading list', () => {
      expect(state.current_smart_list).toEqual(UPDATED_SMART_LIST);
    });
  });

  describe('when saving the smart reading list fails', () => {
    beforeEach(() => {
      state = reducer(
        {
          ...state,
          saving_reading_smart_list: true,
          saving_reading_smart_list_failed: false
        },
        new SmartReadingListSaveFailed()
      );
    });

    it('clears the smart saving reading list flag', () => {
      expect(state.saving_reading_smart_list).toBeFalsy();
    });

    it('sets the saving smart reading list failed flag', () => {
      expect(state.saving_reading_smart_list_failed).toBeTruthy();
    });
  });
});
