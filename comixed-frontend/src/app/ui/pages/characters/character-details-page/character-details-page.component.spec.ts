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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'app/app.state';
import * as LibraryActions from 'app/actions/library.actions';
import { DataViewModule } from 'primeng/dataview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { SelectedComicsListComponent } from 'app/ui/components/library/selected-comics-list/selected-comics-list.component';
import { LibraryFilterComponent } from 'app/ui/components/library/library-filter/library-filter.component';
import { ComicListComponent } from 'app/ui/components/library/comic-list/comic-list.component';
import { ComicGridItemComponent } from 'app/ui/components/library/comic-grid-item/comic-grid-item.component';
import { ComicListItemComponent } from 'app/ui/components/library/comic-list-item/comic-list-item.component';
import { ComicListToolbarComponent } from 'app/ui/components/library/comic-list-toolbar/comic-list-toolbar.component';
import { ComicCoverComponent } from 'app/ui/components/comic/comic-cover/comic-cover.component';
import { ComicCharacterPipe } from 'app/pipes/comic-character.pipe';
import { ComicCoverUrlPipe } from 'app/pipes/comic-cover-url.pipe';
import { ComicTitlePipe } from 'app/pipes/comic-title.pipe';
import { CharacterDetailsPageComponent } from './character-details-page.component';
import { REDUCERS } from 'app/app.reducers';
import { ConfirmationService, ConfirmDialogModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CharacterDetailsPageComponent', () => {
  let component: CharacterDetailsPageComponent;
  let fixture: ComponentFixture<CharacterDetailsPageComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        FormsModule,
        StoreModule.forRoot(REDUCERS),
        TranslateModule.forRoot(),
        DataViewModule,
        SplitButtonModule,
        ScrollPanelModule,
        SidebarModule,
        SliderModule,
        CheckboxModule,
        DropdownModule,
        PanelModule,
        OverlayPanelModule,
        CardModule,
        ConfirmDialogModule
      ],
      providers: [ConfirmationService],
      declarations: [
        CharacterDetailsPageComponent,
        SelectedComicsListComponent,
        LibraryFilterComponent,
        ComicListComponent,
        ComicGridItemComponent,
        ComicListItemComponent,
        ComicListToolbarComponent,
        ComicCoverComponent,
        ComicCharacterPipe,
        ComicCoverUrlPipe,
        ComicTitlePipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    store.dispatch(new LibraryActions.LibraryReset());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
