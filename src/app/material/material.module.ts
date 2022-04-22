import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

const MaterialComponent = [
  MatExpansionModule,
  MatDialogModule,
  MatMenuModule,
  MatBadgeModule
]

@NgModule({
  exports: [
    MaterialComponent
  ],
  imports: [
    MaterialComponent
  ]
})
export class MaterialModule { }
