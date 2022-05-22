import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',


  children: [
    // ----- DEFAULT ----- //
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'editor'
    },

    // ----- EDITOR ----- //
    {
      path: 'editor',
      loadChildren: () =>
        import('./components/editor/editor.module').then((m) => m.EditorModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
