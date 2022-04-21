import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

const MaterialComponent = [
  MatExpansionModule,
  MatDialogModule
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
