import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullscreenPageRoutingModule } from './fullscreen-routing.module';

import { FullscreenPage } from './fullscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullscreenPageRoutingModule
  ],
  declarations: [FullscreenPage]
})
export class FullscreenPageModule {}
