import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-page.html',
})
export default class ProfilePage {
  private fb = inject(FormBuilder);

  // Helper estático para usar desde el template
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    edad: [0, [Validators.required, Validators.min(18)]],
    correo: ['', [Validators.required, Validators.email]],
  });

  // Getters para acceder a los controles desde el template
  get nombre() {
    return this.myForm.controls['nombre'];
  }

  get edad() {
    return this.myForm.controls['edad'];
  }

  get correo() {
    return this.myForm.controls['correo'];
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }
}