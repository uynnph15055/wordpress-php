import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

const MaterialComponent = [
  MatExpansionModule,
  MatDialogModule,
  MatMenuModule,
  MatBadgeModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule
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
