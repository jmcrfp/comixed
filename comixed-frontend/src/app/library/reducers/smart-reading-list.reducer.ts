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
  SmartReadingListActions,
  SmartReadingListActionTypes
} from '../actions/smart-reading-list.actions';
import { SmartReadingList } from 'app/library/models/smart-reading-list/smart-reading-list';

export interface SmartReadingListState {
  fetching_smart_lists: boolean;
  reading_smart_lists: SmartReadingList[];
  fetching_smart_list: boolean;
  current_smart_list: SmartReadingList;
  saving_reading_smart_list: boolean;
  saving_reading_smart_list_failed: boolean;
}

export const initial_state: SmartReadingListState = {
  fetching_smart_lists: false,
  reading_smart_lists: [],
  fetching_smart_list: false,
  current_smart_list: null,
  saving_reading_smart_list: false,
  saving_reading_smart_list_failed: false
};

export const SMART_READING_LIST_FEATURE_KEY = 'smartReadingList';

export function reducer(
  state = initial_state,
  action: SmartReadingListActions
): SmartReadingListState {
  switch (action.type) {
    case SmartReadingListActionTypes.LoadSmartReadingLists:
      return { ...state, fetching_smart_lists: true };

    case SmartReadingListActionTypes.SmartReadingListsLoaded:
      return {
        ...state,
        fetching_smart_lists: false,
        reading_smart_lists: action.payload.reading_smart_lists
      };

    case SmartReadingListActionTypes.LoadSmartReadingListsFailed:
      return { ...state, fetching_smart_lists: false };

    case SmartReadingListActionTypes.GetSmartReadingList:
      return { ...state, fetching_smart_list: true };

    case SmartReadingListActionTypes.SmartReadingListReceived:
      return {
        ...state,
        fetching_smart_list: false,
        current_smart_list: action.payload.reading_smart_list
      };

    case SmartReadingListActionTypes.GetSmartReadingListFailed:
      return { ...state, fetching_smart_list: false };

    case SmartReadingListActionTypes.CreateSmartReadingList:
      return { ...state, current_smart_list: {} as SmartReadingList };

    case SmartReadingListActionTypes.SaveSmartReadingList:
      return { ...state, saving_reading_smart_list: true };

    case SmartReadingListActionTypes.SmartReadingListSaved: {
      const lists = state.reading_smart_lists.filter(
        list => list.id !== action.payload.reading_smart_list.id
      );
      lists.push(action.payload.reading_smart_list);

      return {
        ...state,
        saving_reading_smart_list: false,
        saving_reading_smart_list_failed: false,
        reading_smart_lists: lists,
        current_smart_list: action.payload.reading_smart_list
      };
    }

    case SmartReadingListActionTypes.SaveSmartReadingListFailed:
      return {
        ...state,
        saving_reading_smart_list: false,
        saving_reading_smart_list_failed: true
      };

    default:
      return state;
  }
}
