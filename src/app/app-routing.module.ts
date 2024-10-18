import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  { 
    path: ''
    ,component: LoginComponent
  }
  ,{
    path: 'login'
    ,component: LoginComponent
  }
  ,{
    path: 'register'
    ,component: RegisterComponent
  }
  ,{
    path: 'chat'
    ,component: ChatComponent
    ,canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
