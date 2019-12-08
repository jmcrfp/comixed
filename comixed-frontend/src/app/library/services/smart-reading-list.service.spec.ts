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

import { SmartReadingListService } from './smart-reading-list.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SMART_READING_LIST_1 } from 'app/library/models/smart-reading-list/smart-reading-list.fixtures';
import { interpolate } from 'app/app.functions';
import {
  GET_SMART_READING_LIST_URL,
  GET_SMART_READING_LISTS_URL,
  SAVE_SMART_READING_LIST_URL
} from 'app/app.constants';
import { SmartReadingList } from 'app/library/models/smart-reading-list/smart-reading-list';
import { SaveSmartReadingListRequest } from 'app/library/models/net/save-smart-reading-list-request';

describe('ReadingListService', () => {
  const SMART_READING_LISTS = [SMART_READING_LIST_1];

  let service: SmartReadingListService;
  let http_mock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmartReadingListService]
    });

    service = TestBed.get(SmartReadingListService);
    http_mock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can load reading lists', () => {
    service
      .get_all()
      .subscribe(response => expect(response).toEqual(SMART_READING_LISTS));

    const req = http_mock.expectOne(interpolate(GET_SMART_READING_LISTS_URL));
    expect(req.request.method).toEqual('GET');
    req.flush(SMART_READING_LISTS);
  });

  it('can get a single reading list', () => {
    service
      .get_smart_reading_list(SMART_READING_LIST_1.id)
      .subscribe(response => expect(response).toEqual(SMART_READING_LIST_1));

    const req = http_mock.expectOne(
      interpolate(GET_SMART_READING_LIST_URL, { id: SMART_READING_LIST_1.id })
    );
    expect(req.request.method).toEqual('GET');
    req.flush(SMART_READING_LIST_1);
  });

  it('can save a reading list', () => {
    service
      .save_smart_reading_list(SMART_READING_LIST_1)
      .subscribe(response => expect(response).toEqual(SMART_READING_LIST_1));

    const req = http_mock.expectOne(
      interpolate(SAVE_SMART_READING_LIST_URL, { id: SMART_READING_LIST_1.id })
    );
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({
      name: SMART_READING_LIST_1.name,
      entries: SMART_READING_LIST_1.entries.map(entry => entry.comic.id),
      summary: SMART_READING_LIST_1.summary
    } as SaveSmartReadingListRequest);
    req.flush(SMART_READING_LIST_1);
  });
});
