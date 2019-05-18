/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2018, The ComiXed Project
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
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { AccountPreferencesComponent } from 'app/ui/components/account/account-preferences/account-preferences.component';
import { UserDetailsComponent } from 'app/ui/components/account/user-details/user-details.component';
import { READER_USER } from 'app/models/user/user.fixtures';
import { AccountPageComponent } from './account-page.component';
import { REDUCERS } from 'app/app.reducers';

describe('AccountPageComponent', () => {
  let component: AccountPageComponent;
  let fixture: ComponentFixture<AccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        StoreModule.forRoot(REDUCERS),
        TabViewModule,
        TableModule
      ],
      declarations: [
        AccountPageComponent,
        AccountPreferencesComponent,
        UserDetailsComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountPageComponent);
    component = fixture.componentInstance;
    component.user = READER_USER;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
