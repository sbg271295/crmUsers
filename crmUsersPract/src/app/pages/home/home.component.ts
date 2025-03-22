import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUsers } from '../../interfaces/iusers.interface';
import { UserCardComponent } from "../../shared/user-card/user-card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  arrUsers: IUsers[] = [];
  grupoSeleccionado: number = 1; // 1 o 2
  usersService = inject(UsersService);

  ngOnInit() {
    this.cargarUsers();
  }

  async cargarUsers() {
    try {
      let response = await this.usersService.getAllPromise();
      this.arrUsers = response; // Asegúrate de que response tiene .results
    } catch (error) {
      console.log("No carga", error);
    }
  }

  // Método para cambiar de grupo
  cambiarGrupo(grupo: number) {
    this.grupoSeleccionado = grupo;
  }

  // Método para dividir usuarios
  obtenerGrupo(grupo: number): IUsers[] {
    const mitad = Math.ceil(this.arrUsers.length / 2);
    return grupo === 1 ? this.arrUsers.slice(0, mitad) : this.arrUsers.slice(mitad);
  }

  deleteEmployee(event:Boolean){
    if(event){
      this.cargarUsers();
    }else{

    }
  }
}

