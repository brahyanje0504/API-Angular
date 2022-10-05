import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { Person } from 'src/app/models/models';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private services: ServicesService) { }

  ngOnInit(): void {
    this.traerPersonas()
  }

  listOfData: Person[] = [];

  traerPersonas(){
    let o = this.services.TraerPersonas()
    o.subscribe(respuesta => {
      this.listOfData = respuesta.body!
    
    })
  }

  saludar(nombre:string){
    alert(`Hola ${nombre}`)
  }

  agregar(){
    
  }

}
