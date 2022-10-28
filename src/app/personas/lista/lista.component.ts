import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { observable } from 'rxjs';
import { Person } from 'src/app/models/models';
import { ServicesService } from 'src/app/services/services.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private services: ServicesService, private modalService: NzModalService) {}
  personas: Person[] = [];
  contador: number = 1

  ngOnInit(): void {
    this.traerPersonas()
  }

  traerPersonas(){
    let o = this.services.TraerPersonas()
    o.subscribe(respuesta => {
      this.personas = respuesta.body!
    
    })
  }

  eliminar(id:string){
    this.services.EliminarPersonas(id.toString()).subscribe(r =>{
      if (r.status == 200){
        window.location.reload()
      }
    })
  }

  eliminar2(id: string){
    this.modalService.confirm({
      nzTitle: 'Esta seguro que desea eliminar?',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.eliminar(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  add(isCreated: boolean, persona: any){
    this.modalService.create({
      nzTitle: 'Agregar nueva persona',
      nzContent: FormComponent,
      nzComponentParams: {
        isCreated: isCreated,
        Key: persona.key,
        Name: persona.name,
        Age: persona.age,
        Address: persona.address
      }

    });
  }


  add2(){
    this.contador = this.contador +1
  }
}
