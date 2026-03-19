import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface LoginData {
  email: string;
  password: string;
}

import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { ProductsService } from '../../../core/services/products-service';

@Component({
  selector: 'app-login',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    FormField,
    MatButton,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Correo es requerido' });
    email(schemaPath.email, { message: 'Correo invalido' });
    required(schemaPath.password, { message: 'Constrasena es requerido' });
  });

  onSubmit(event: Event) {

    event.preventDefault();
    submit(this.loginForm, {
      action: async () => {
        const credentials = this.loginModel();
        console.log('Credenciales de login:', credentials);
      },
    });
  }

}
