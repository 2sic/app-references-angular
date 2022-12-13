import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

constructor() { }

  toolbarFor(item?: any) {
    const mainConfig = 'toolbar=empty?contentType=Reference&entityId=' + (item?.Id ?? '0');
    return item
      ? [mainConfig, "edit", "delete&color=gray?entityGuid=" + item.Guid]
      : [mainConfig, 'new&title=New Reference', 'contentitems&title=References', "settings&hover=left&autoAddMore=start"]
  }

  toolbarForCategory() {
    return ['toolbar=empty?contentType=Category', 'new&title=New Category', 'contentitems&title=Categories'];
  }

  toolbarForInstance(item?: any) {
    const mainConfig = 'toolbar=empty?contentType=InstanceSettings&entityId=' + (item?.Id ?? '0');
    return [mainConfig, "edit", "app"];
  }

}
