import { SxcAppComponent, Context, SxcApp } from '@2sic.com/sxc-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Image } from 'src/app/shared/interfaces/image.interface';
import { Resources } from 'src/app/shared/interfaces/resources.interface';
import { Category } from '../../../shared/interfaces/category.interfaces';
import { Reference } from '../../../shared/interfaces/references.interfaces';

@Injectable({providedIn: 'root'})
export class SxcDataService {

    categories$: Observable<Category[]>;
    references$: Observable<Reference[]>;
    resources$: Observable<Resources>;
    settings$: Observable<any>;

    constructor(
      private http: HttpClient,
      private context: Context,
      private app: SxcApp
    ) {
      this.settings$ = app.query<any>('Settings').getAll().pipe(shareReplay());

      this.references$ = app.data<Reference>('Reference').getAll().pipe(map(v => v.sort((a,b) => a.CreateDate > b.CreateDate ? -1 : 1))).pipe(shareReplay());
      this.categories$ = app.data<Category>('Category').getAll().pipe(shareReplay());

      this.resources$ = app.data<Resources>('Resources').getAll().pipe(
        map((resources: Resources[]) => resources[0]),
        shareReplay(),
      );
    }

    getImagesByReferenceId(referenceId: number): Observable<Image[]> {
      const params = new HttpParams().set('entityId', `${referenceId}`);
      return this.app.api('References').get<Image[]>('GetImages', params);
    }
}
