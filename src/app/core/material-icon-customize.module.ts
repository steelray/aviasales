import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IMatIcon } from './interfaces/mat-icon.interface';
import { MATERIAL_ICONS_LIST } from './material-icons-list';

@NgModule()
export class MaterialIconCustomizeModule {
  constructor(private sanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry) {
    const extension = '.svg';
    MATERIAL_ICONS_LIST.forEach((icon: IMatIcon) => {
      const url = sanitizer.bypassSecurityTrustResourceUrl(icon.src + icon.name + extension);
      matIconRegistry.addSvgIcon(icon.name, url);
    });
  }
}
