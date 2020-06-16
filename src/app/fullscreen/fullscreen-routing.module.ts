import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullscreenPage } from './fullscreen.page';

const routes: Routes = [
  {
    path: '',
    component: FullscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullscreenPageRoutingModule {}
