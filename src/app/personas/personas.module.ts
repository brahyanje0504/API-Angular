import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { ListaComponent } from './lista/lista.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    NzTableModule,
    NzDividerModule
  ]
})
export class PersonasModule { }
