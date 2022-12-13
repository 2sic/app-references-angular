import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SxcDataService } from '../core/services/sxc-data/sxc-data.service';
import { combineLatest, Observable } from 'rxjs';
import { Resources } from '../shared/interfaces/resources.interface';
import { ToolbarService } from '../core/services/toolbar.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  categoryFilter: any;
  resources$: Observable<Resources>;
  settings: any;
  isAdmin = false;

  constructor(
    sxcData: SxcDataService,
    public toolbarservice: ToolbarService
  ) {
    this.resources$ = sxcData.resources$;
    this.isAdmin = document.getElementsByTagName("app-root")[0].getAttribute("is-admin") == 'true' ? true : false;

    combineLatest([sxcData.categories$, sxcData.settings$]).pipe(
      tap(result => this.settings = result[1]["Default"][0]),
      tap(result => this.categoryFilter = this.settings.CategoryFilter.length === 0 ? null : result[0].find(x => x.Id === this.settings.CategoryFilter[0].Id))
    ).subscribe();
  }
}
