import { ContentManagerModule, SxcRootModule } from '@2sic.com/sxc-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './overview/categories/categories.component';
import { CategoryButtonComponent } from './overview/categories/category-button/category-button.component';
import { OverviewComponent } from './overview/overview.component';
import { ReferenceItemComponent } from './overview/references/reference-item/reference-item.component';
import { ReferencesComponent } from './overview/references/references.component';
import { ReferenceDetailsComponent } from './reference-details/reference-details.component';
import { DetailLinkComponent } from './overview/detail-link.component'
import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';

const providers: Provider[] = [
];


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryButtonComponent,
    ReferencesComponent,
    OverviewComponent,
    ReferenceItemComponent,
    ReferenceDetailsComponent,
    DetailLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SxcRootModule,
    ContentManagerModule,
    BrowserAnimationsModule,
    GalleryModule,
    LightboxModule,
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
