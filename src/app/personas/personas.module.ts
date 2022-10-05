import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { ListaComponent } from './lista/lista.component';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule
  ]
})
export class PersonasModule { }
