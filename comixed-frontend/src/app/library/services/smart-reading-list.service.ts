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
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CREATE_SMART_READING_LIST_URL,
  GET_SMART_READING_LIST_URL,
  GET_SMART_READING_LISTS_URL,
  SAVE_SMART_READING_LIST_URL
} from 'app/app.constants';
import { interpolate } from 'app/app.functions';
import { SmartReadingList } from 'app/library/models/smart-reading-list/smart-reading-list';
import { SaveSmartReadingListRequest } from 'app/library/models/net/save-smart-reading-list-request';

@Injectable({
  providedIn: 'root'
})
export class SmartReadingListService {
  constructor(private http: HttpClient) {}

  get_all(): Observable<any> {
    return this.http.get(interpolate(GET_SMART_READING_LISTS_URL));
  }

  get_smart_reading_list(id: number): Observable<any> {
    return this.http.get(interpolate(GET_SMART_READING_LIST_URL, { id: id }));
  }

  // TODO joao
  save_smart_reading_list(smart_reading_list: SmartReadingList): Observable<any> {
    // const entries = (smart_reading_list.entries || []).map(entry => entry.comic.id);
    const encoded: SaveSmartReadingListRequest = {
      name: smart_reading_list.name,
      entries: [], // entries,
      summary: smart_reading_list.summary
    };
    if (smart_reading_list.id) {
      return this.http.put(
        interpolate(SAVE_SMART_READING_LIST_URL, { id: smart_reading_list.id }),
        encoded
      );
    } else {
      const params = new HttpParams()
        .set('name', smart_reading_list.name)
        .set('summary', smart_reading_list.summary);
        // .set('entries', entries.toString());
      return this.http.post(interpolate(CREATE_SMART_READING_LIST_URL), params);
    }
  }
}
