import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LoginService } from '../../../core/services/login.service';

interface LoginData {
  email: string;
  password: string;
}

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
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [LoginService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  constructor(private loginService: LoginService) {}

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
        this.loginService.login(credentials.email, credentials.password);
      },
    });
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
