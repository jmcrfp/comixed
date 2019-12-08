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
 * along with this program. If not, see <http://www.gnu.org/licenses>
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SmartReadingListAdaptor } from 'app/library';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbAdaptor } from 'app/adaptors/breadcrumb.adaptor';
import { SmartReadingList } from 'app/library/models/smart-reading-list/smart-reading-list';

@Component({
  selector: 'app-reading-lists-page',
  templateUrl: './smart-reading-lists-page.component.html',
  styleUrls: ['./smart-reading-lists-page.component.scss']
})
export class SmartReadingListsPageComponent implements OnInit, OnDestroy {
  smartReadingListsSubscription: Subscription;
  smartReadingLists: SmartReadingList[];
  langChangeSubscription: Subscription;

  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private smartReadingListAdaptor: SmartReadingListAdaptor,
    private breadcrumbAdaptor: BreadcrumbAdaptor,
    private router: Router
  ) {}

  ngOnInit() {
    this.smartReadingListsSubscription = this.smartReadingListAdaptor.smart_reading_list$.subscribe(
        smart_reading_lists => {
        this.smartReadingLists = smart_reading_lists;
        this.titleService.setTitle(
          this.translateService.instant('smart-reading-lists-page.title', {
            count: this.smartReadingLists.length
          })
        );
      }
    );
    this.smartReadingListAdaptor.get_smart_reading_lists();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      () => this.loadTranslations()
    );
    this.loadTranslations();
  }

  ngOnDestroy(): void {
    this.smartReadingListsSubscription.unsubscribe();
    this.langChangeSubscription.unsubscribe();
  }

  create_new_smart_reading_list(): void {
    this.router.navigateByUrl('/smartlists/new');
  }

  private loadTranslations() {
    this.breadcrumbAdaptor.loadEntries([
      {
        label: this.translateService.instant(
          'breadcrumb.entry.smart-reading-lists-page'
        )
      }
    ]);
  }
}
