import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserCardComponent } from './shared/user-card/user-card.component';
import { VistaUserComponent } from './pages/vista-user/vista-user.component';


export const routes: Routes = [
  //Si no tenemos nada, =>
  {path:"",pathMatch:"full",redirectTo:"home"},
  //Pagina de Inicio
  {path:"home", component:HomeComponent},
  //Ruta para hallar el user
  {path:"home/:_id",component:VistaUserComponent},

//Si no equivocamos con la url =>
  { path: "**", redirectTo: 'home' }
];
