import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

const AnDesignComponent = [
  NzTabsModule
];

@NgModule({
  exports: [
    AnDesignComponent
  ],
  imports: [
    CommonModule
  ],
})

export class AndesginModule { }
