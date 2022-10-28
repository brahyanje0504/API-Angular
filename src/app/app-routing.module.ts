import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasModule } from './personas/personas.module';
import { MascotasModule } from './mascotas/mascotas.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/personas' },
  { path: 'personas', loadChildren: () => import('./personas/personas.module').then(m => m.PersonasModule) },
  { path: 'mascotas', loadChildren: () => import('./mascotas/mascotas.module').then(m => m.MascotasModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


