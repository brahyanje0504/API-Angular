import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  {
    path:":id",
    component: ListaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MascotasRoutingModule { }
