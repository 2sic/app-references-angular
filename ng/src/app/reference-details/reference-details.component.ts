import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { delay, map, share, takeWhile, tap } from 'rxjs/operators';
import { SxcDataService } from '../core/services/sxc-data/sxc-data.service';
import { Image } from '../shared/interfaces/image.interface';
import { Reference } from '../shared/interfaces/references.interfaces';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToolbarService } from '../core/services/toolbar.service';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-reference-details',
  templateUrl: './reference-details.component.html',
  styleUrls: ['./reference-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ReferenceDetailsComponent implements OnInit {

  servicesLabel: string;
  linksLabel: string;
  btnBack: string;

  loading = true;

  reference: Reference;
  images$: Observable<Image[]>;

  items: GalleryItem[];

  constructor(
    private route: ActivatedRoute,
    private sxcData: SxcDataService,
    public toolbarservice: ToolbarService,
    public gallery: Gallery,
    public lightbox: Lightbox
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.sxcData.resources$.pipe(
      tap(resources => this.servicesLabel = resources.ServicesLabel),
      tap(resources => this.linksLabel = resources.LinksLabel),
      tap(resources => this.btnBack = resources.BackBtnLabel),
    ).subscribe();

    // get reference via route parameter
    combineLatest(
      this.route.params,
      this.sxcData.references$,
    ).pipe(
      takeWhile(() => !this.reference),
      map(([params, references]) => references.find(ref => ref.UrlPath === params.reference) || null),
      tap(reference => this.images$ = this.sxcData.getImagesByReferenceId(reference.Id)),
      tap(reference => this.reference = reference),
    ).subscribe(() => {
      // image Lightbox
      this.images$.subscribe(data => {
        this.items = data.map(item =>
          new ImageItem({ src: item.Url, thumb: item.Url })
        )
        this.gallery.ref().load(this.items);
      })

      this.loading = false;
    });
  }
}
