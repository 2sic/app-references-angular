import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryFilterService } from '../../core/services/catergory-filter/category-filter.service';
import { Reference } from '../../shared/interfaces/references.interfaces';
import { Category } from 'src/app/shared/interfaces/category.interfaces';
import {map } from 'rxjs/operators';
import { ToolbarService } from 'src/app/core/services/toolbar.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent {

  private _catFilter: CategoryFilterService;
  isAdmin = false;

  @Input()
  set categoryFilter(cat: Category) {
    if(cat)
      this._catFilter.updateSelectedCategory(cat);
  }

  @Input()
  settings: any;
  references$: Observable<Reference[]>;

  constructor(
    catFilter: CategoryFilterService,
    public toolbarservice: ToolbarService
  ) {
    this.isAdmin = document.getElementsByTagName("app-root")[0].getAttribute("is-admin") == "true" ? true : false;
    this._catFilter = catFilter;
    this.references$ = catFilter.referencesBySelectedCategory$
      .pipe(map(a => this.settings.LimitCount ? a.slice(0, this.settings.LimitCount) : a));
  }
}
