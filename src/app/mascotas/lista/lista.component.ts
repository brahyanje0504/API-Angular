import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Pet } from 'src/app/models/models';
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private services: ServicesService, private modalService: NzModalService, private router: ActivatedRoute) {
  }
  mascotas: Pet[] = [];
  idPersona: any


  ngOnInit(): void {
    this.idPersona = this.router.snapshot.paramMap.get('id')
    this.traerMascotas()

  }

  traerMascotas(){
    this.services.TraerMascotas(this.idPersona).subscribe(respuesta => {
      this.mascotas = respuesta.body!
    
    })
  }

  addPet(isCreated: boolean, mascota: any){
    this.modalService.create({
      nzTitle: 'Agregar nueva Mascota',
      nzContent: FormComponent,
      nzComponentParams: {
        isCreated: isCreated,
        Id: this.idPersona,
        Key: mascota.id,
        Name: mascota.name,
        Raza: mascota.raza,
        Age: mascota.age,
      }

    });
  }

  eliminar(key: string){
    this.services.EliminarMascota(this.idPersona,key).subscribe(r =>{
      if (r.status == 200){
        window.location.reload()
      }
    })
  }

  eliminarPet(key: string){
    this.modalService.confirm({
      nzTitle: 'Esta seguro que desea eliminar?',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.eliminar(key),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}
