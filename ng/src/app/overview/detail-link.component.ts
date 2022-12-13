import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail-link',
  template: `
<div *ngIf="useRouting; else nonRouting">
    <a [routerLink]="['/reference', path]">
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
    </a>
</div>

<ng-template #nonRouting>
    <a [href]="referencesPage + '/reference/' + path">
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
    </a>
</ng-template>

<ng-template #contentTpl><ng-content></ng-content> </ng-template>
`,
    styleUrls: ['./detail-link.component.scss']
})
export class DetailLinkComponent {
    @Input()
    useRouting: boolean;
    @Input()
    path: string;
    @Input()
    referencesPage: string;
}
