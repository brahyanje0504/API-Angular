import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Person } from 'src/app/models/models';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() isCreated: boolean = false;
  @Input() Key: number = 0;
  @Input() Name: string = "";
  @Input() Age: number = 0;
  @Input() Address: string = "";

  constructor(private modal: NzModalRef, private service: ServicesService, private fb: UntypedFormBuilder) { }

  validateForm!: UntypedFormGroup;

  buildParameter():Person {
    return {
      key: this.validateForm.value.key,
      name: this.validateForm.value.name,
      age: parseInt(this.validateForm.value.age),
      address: this.validateForm.value.address
    } as Person
  }
  Aceptar(): void {
    if (this.validateForm.valid) {
      if (this.isCreated == false){
        this.service.EditarPersona(this.buildParameter()).subscribe(r=> {
          
          if (r.status == 200)        {
            this.modal.destroy()
            window.location.reload()
          }
        }, err =>{
  
          console.log(err);
          
        })
      } else {
        this.service.GuardarPersona(this.buildParameter()).subscribe(r=> {
        

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
  ngOnInit(): void {

    if (this.isCreated){
      this.validateForm = this.fb.group({
        key: [null, [Validators.required]],
        name: [null, [Validators.required]],
        age: [null, [Validators.required]],
        address: [null, [Validators.required]],
      });
    }else{
      this.validateForm = this.fb.group({
        key: [{value: this.Key, disabled: true}, [Validators.required]],
        name: [this.Name, [Validators.required]],
        age: [this.Age, [Validators.required]],
        address: [this.Address, [Validators.required]],
      });
    }


  }
  cancelar(): void {
    this.modal.destroy();
    alert("cancelado")
  }
}
