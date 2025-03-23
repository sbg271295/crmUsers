import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserCardComponent } from './shared/user-card/user-card.component';
import { VistaUserComponent } from './pages/vista-user/vista-user.component';
import { NewUserComponent } from './pages/new-user/new-user.component';


export const routes: Routes = [
  //Si no tenemos nada, =>
  {path:"",pathMatch:"full",redirectTo:"home"},
  //Pagina de Inicio
  {path:"home", component:HomeComponent},
  //Ruta para hallar el user
  {path:"home/:id",component:VistaUserComponent},
    //Ruta para hallar el formularioNew
  {path:"newUser",component:NewUserComponent},

//Si no equivocamos con la url =>
  { path: "**", redirectTo: 'home' }
];
