import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditorControlsComponent } from './editor-controls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditorControlsComponent],

  exports: [EditorControlsComponent],

  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
})
export class EditorControlsModule {}
