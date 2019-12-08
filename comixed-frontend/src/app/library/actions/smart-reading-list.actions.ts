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

import { Action } from '@ngrx/store';
import { SmartReadingList } from 'app/library/models/smart-reading-list/smart-reading-list';

export enum SmartReadingListActionTypes {
  LoadSmartReadingLists = '[SMART READING LIST] Load smart reading lists',
  SmartReadingListsLoaded = '[SMART READING LIST] All smart reading lists loaded',
  LoadSmartReadingListsFailed = '[SMART READING LIST] Failed to load smart reading lists',
  GetSmartReadingList = '[SMART READING LIST] Get a single smart reading list',
  SmartReadingListReceived = '[SMART READING LIST] Received a single smart reading list',
  GetSmartReadingListFailed = '[SMART READING LIST] Failed get a single smart reading list',
  CreateSmartReadingList = '[SMART READING LIST] Create a new smart reading list',
  SaveSmartReadingList = '[SMART READING LIST] Save a smart reading list',
  SmartReadingListSaved = '[SMART READING LIST] Saved the smart reading list',
  SaveSmartReadingListFailed = '[SMART READING LIST] Failed to save the smart reading list'
}

export class SmartReadingListsLoad implements Action {
  readonly type = SmartReadingListActionTypes.LoadSmartReadingLists;

  constructor() {}
}

export class SmartReadingListsLoaded implements Action {
  readonly type = SmartReadingListActionTypes.SmartReadingListsLoaded;

  constructor(public payload: { reading_smart_lists: SmartReadingList[] }) {}
}

export class SmartReadingListLoadFailed implements Action {
  readonly type = SmartReadingListActionTypes.LoadSmartReadingListsFailed;

  constructor() {}
}

export class SmartReadingListGet implements Action {
  readonly type = SmartReadingListActionTypes.GetSmartReadingList;

  constructor(public payload: { id: number }) {}
}

export class SmartReadingListReceived implements Action {
  readonly type = SmartReadingListActionTypes.SmartReadingListReceived;

  constructor(public payload: { reading_smart_list: SmartReadingList }) {}
}

export class SmartReadingListGetFailed implements Action {
  readonly type = SmartReadingListActionTypes.GetSmartReadingListFailed;

  constructor() {}
}

export class SmartReadingListCreate implements Action {
  readonly type = SmartReadingListActionTypes.CreateSmartReadingList;

  constructor() {}
}

export class SmartReadingListSave implements Action {
  readonly type = SmartReadingListActionTypes.SaveSmartReadingList;

  constructor(public payload: { reading_smart_list: SmartReadingList }) {}
}

export class SmartReadingListSaved implements Action {
  readonly type = SmartReadingListActionTypes.SmartReadingListSaved;

  constructor(public payload: { reading_smart_list: SmartReadingList }) {}
}

export class SmartReadingListSaveFailed implements Action {
  readonly type = SmartReadingListActionTypes.SaveSmartReadingListFailed;

  constructor() {}
}

export type SmartReadingListActions =
  | SmartReadingListsLoad
  | SmartReadingListsLoaded
  | SmartReadingListLoadFailed
  | SmartReadingListGet
  | SmartReadingListReceived
  | SmartReadingListGetFailed
  | SmartReadingListCreate
  | SmartReadingListSave
  | SmartReadingListSaved
  | SmartReadingListSaveFailed;
