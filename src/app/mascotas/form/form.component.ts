import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Pet } from 'src/app/models/models';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() isCreated: boolean = false;
  @Input() Id: string = "";
  @Input() Key: string = "";
  @Input() Name: string = "";
  @Input() Age: number = 0;
  @Input() Raza: string = "";

  constructor(private modal: NzModalRef, private service: ServicesService, private fb: UntypedFormBuilder) { }
  validateForm!: UntypedFormGroup;

  buildParameter():Pet {
    return {
      propietario: this.Id,
      id: this.Key,
      name: this.validateForm.value.name,
      age: parseInt(this.validateForm.value.age),
      raza: this.validateForm.value.raza
    } as Pet
  }

  aceptar(): void {
    if (this.validateForm.valid) {
      if (this.isCreated == false){
        this.service.EditarMascota(this.buildParameter(), this.Id).subscribe(r=> {
          
          if (r.status == 200)        {
            this.modal.destroy()
            window.location.reload()
          }
        }, err =>{
  
          console.log(err);
          
        })
      } else {
        this.service.GuardarMascota(this.buildParameter()).subscribe(r=> {
        
          if (r.status == 200)        {
            this.modal.destroy()
            window.location.reload()
          }
        }, err =>{
          
          console.log(err);
          
        })
      }
      
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancelar(): void {
    this.modal.destroy();
  }

  ngOnInit(): void {
    if (this.isCreated){
      this.validateForm = this.fb.group({
        name: [null, [Validators.required]],
        raza: [null, [Validators.required]],
        age: [null, [Validators.required]],
      });
    }else{
      this.validateForm = this.fb.group({       
        name: [this.Name, [Validators.required]],
        raza: [this.Raza, [Validators.required]],
        age: [this.Age, [Validators.required]],
      });
    }
  }

}
