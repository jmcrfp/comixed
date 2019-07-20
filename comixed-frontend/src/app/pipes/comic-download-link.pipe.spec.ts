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
 * along with this program. If not, see <http://www.gnu.org/licenses/>.package
 * org.comixed;
 */

import { ComicDownloadLinkPipe } from './comic-download-link.pipe';
import { COMIC_1000 } from 'app/models/comics/comic.fixtures';
import { COMIC_SERVICE_API_URL } from 'app/services/comic.service';

describe('ComicDownloadLinkPipe', () => {
  const pipe = new ComicDownloadLinkPipe();
  const comic = COMIC_1000;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns a URL for the comic provided', () => {
    expect(pipe.transform(comic)).toEqual(
      `${COMIC_SERVICE_API_URL}/comics/${comic.id}/download`
    );
  });

  it('returns an empty string when the comic file is missing', () => {
    expect(pipe.transform({ ...comic, missing: true })).toEqual('');
  });
});