import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';


const AnDesignComponent = [
  NzTabsModule,
  NzSelectModule,
  NzSpinModule
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
