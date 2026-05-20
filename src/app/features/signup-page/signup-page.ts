import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from './validators/password-match.validator';
@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPage {
//   emailControl = new FormControl('',
//     [Validators.required, Validators.email]//validadores sincronos

//   );

// get email(){
//   return this.emailControl;
  
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {
    validators: passwordMatchValidator
  });

  get email() {return this.form.get('email')!;
  }
  get password() {return this.form.get('password')!;
  }
  get confirmPassword() {return this.form.get('confirmPassword')!;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Datos del formulario:', this.form.value);
    this.router.navigate(['/']);
  }
}
