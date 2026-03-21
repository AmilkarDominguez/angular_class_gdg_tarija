import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoginService {

  router = inject(Router);
  toastr = inject(ToastrService);

  login(email: string, password: string) {
    if (email && password) {
      this.router.navigate(['/admin']);
      this.toastr.success(email + ' dasboard!', 'Welcome');
    }
  }

}
