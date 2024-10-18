import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ILoginResponse } from '../../interfaces/i-login-response';
import { Route, Router } from '@angular/router';
import { AppCookieService } from '../../services/app-cookie.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private userService: UserService
    ,private router: Router
    ,private appCookieService: AppCookieService
  ){

  }
  
  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('',Validators.required)
    ,password: new FormControl('',Validators.required)
  });

  onSubmit(){
    let email = this.loginFormGroup.controls.email.value;
    let password = this.loginFormGroup.controls.password.value;

    this.userService.login(email, password).subscribe((response: ILoginResponse)=>{

        console.log("response:"+response.token);
        this.appCookieService.setAccessToken(response.token)
        
        this.router.navigate(['/chat']);

    },(error: any)=>{
      console.log("Full error:", JSON.stringify(error));
    }
  );
  }

}
