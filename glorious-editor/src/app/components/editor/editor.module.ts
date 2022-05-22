import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditorControlsModule } from '../editor-controls';

export const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
  },
];

@NgModule({
  declarations: [EditorComponent],

  exports: [EditorComponent],

  imports: [
    MatIconModule,
    MatButtonModule,
    EditorControlsModule,
    RouterModule.forChild(routes),
  ],
})
export class EditorModule {}
