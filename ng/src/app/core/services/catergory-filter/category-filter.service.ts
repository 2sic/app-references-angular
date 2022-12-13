import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from 'src/app/shared/interfaces/category.interfaces';
import { Reference } from 'src/app/shared/interfaces/references.interfaces';
import { SxcDataService } from '../sxc-data/sxc-data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryFilterService {

  referencesBySelectedCategory$: Observable<Reference[]>;

  selectedCategory$: Observable<Category>;
  private selectedCategorySubjet$ = new Subject<Category>();

  constructor(
    sxcData: SxcDataService,
  ) {

    this.selectedCategory$ = this.selectedCategorySubjet$.pipe(shareReplay());

    this.referencesBySelectedCategory$ = combineLatest(
      this.selectedCategory$,
      sxcData.references$,
    ).pipe(
      map(([category, references]) =>
        // if Id is null return all references
        !!category.Id
        ? this.referencesByCategory(category, references)
        : references
      ),
      shareReplay(),
    );
  }

  updateSelectedCategory(category: Category) {
    this.selectedCategorySubjet$.next(category);
  }

  referencesByCategory(category: Category, references: Reference[]): Reference[] {
    const filteredRefs: Reference[] = references.filter(ref => {
      return ref.Category.some(cat => cat.Id === category.Id);
    });
  
    return filteredRefs;
  }
}

