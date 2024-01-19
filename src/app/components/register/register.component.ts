import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private userService: UserService
    ,private router: Router
    ){}

  registerFormGroup: FormGroup = new FormGroup({
    email: new FormControl('',Validators.required)
    ,userName: new FormControl('',Validators.required)
    ,password: new FormControl('',Validators.required)
  });


  onSubmit(){
    let email = this.registerFormGroup.controls.email.value;
    let userName = this.registerFormGroup.controls.userName.value;
    let password = this.registerFormGroup.controls.password.value;

    this.userService.register(email,userName,password).subscribe((response)=>{
        alert('gg');
        this.router.navigate(['/login']);
    },(error)=>{
        alert('register error');
    })

    }
    
  
}
