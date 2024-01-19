import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AppCookieService } from '../../services/app-cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private userSerivce: UserService
    ,private appCookieService: AppCookieService
    ,private router: Router
    ){}

  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('',Validators.required)
    ,password: new FormControl('',Validators.required)
  });

  onSubmit(): void{
      if(this.loginFormGroup.invalid){
        return;
      }

      let email = this.loginFormGroup.controls.email.value;
      let password = this.loginFormGroup.controls.password.value;
  
      
    this.userSerivce.login(email,password).subscribe((response)=>{
        this.appCookieService.setAccessToken(response.token);
        this.router.navigate(['/chat']);
    },(error)=>{
        alert("error: "+error.error.errorMessage);
    })  

  }



}
