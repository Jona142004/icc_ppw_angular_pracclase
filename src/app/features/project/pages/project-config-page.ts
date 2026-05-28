import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
  selector: 'app-project-config-page',
  imports: [ReactiveFormsModule],
  templateUrl: './project-config-page.html',
  styles: ``
})
export default class ProjectConfigPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    lenguajes: this.fb.array(
      [
        this.fb.control('JavaScript', [Validators.required, Validators.minLength(3)]),
        this.fb.control('TypeScript', [Validators.required, Validators.minLength(3)]),
      ],
      [Validators.minLength(2)]
    ),
    tipo: ['fullstack', Validators.required],
    notificaciones: [true],
    terminosAceptados: [false, Validators.requiredTrue],
  });

  newLenguaje: FormControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  get lenguajes(): FormArray {
    return this.myForm.get('lenguajes') as FormArray;
  }

  onAddLenguaje() {
    if (this.newLenguaje.invalid) return;

    this.lenguajes.push(
      this.fb.control(this.newLenguaje.value, [
        Validators.required,
        Validators.minLength(3)
      ])
    );

    this.newLenguaje.reset();
  }

  onDeleteLenguaje(index: number) {
    this.lenguajes.removeAt(index);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) return;

    console.log('Proyecto guardado:', this.myForm.value);
  }
}
