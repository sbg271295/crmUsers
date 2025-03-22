import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
  //Si no tenemos nada, =>
  {path:"",pathMatch:"full",redirectTo:"home"},
  //Pagina de Inicio
  {path:"home", component:HomeComponent},

//Si no equivocamos con la url =>
  { path: "**", redirectTo: 'home' }
];
