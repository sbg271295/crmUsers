import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse.interfaz';
import { IUsers } from '../../interfaces/iusers.interface';
import { UserCardComponent } from "../../shared/user-card/user-card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [UserCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  arrUsers:IUsers[]=[]
  usersService=inject(UsersService)

  ngOnInit(){
    this.cargarUsers();
  }
  async cargarUsers(){
    try{
      let response:IResponse= await this.usersService.getAllPromise();
      this.arrUsers=response.results
    }catch(error){
      console.log("No carga")
    }
  }
}
