import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { DisplayComponent } from './components/display/display.component';
import { ButtonComponent } from './components/button/button.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inicio', component: MainComponent },
  { path: 'display', component: DisplayComponent },
  { path: 'button', component: ButtonComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
