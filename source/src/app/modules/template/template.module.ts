import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AlertComponent } from './components/alert/alert.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AlertComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    NavbarComponent, 
    AlertComponent,
    FooterComponent,
    LoaderComponent
  ]
})
export class TemplateModule { }
