import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUsers } from '../../interfaces/iusers.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-vista-user',
  templateUrl: './vista-user.component.html',
  styleUrl: './vista-user.component.css',
  imports: []
})
export class VistaUserComponent {
  @Input() myUserid: string = "";
  user!: IUsers | any; // ✅ Almacenar el usuario aquí
  userservice = inject(UsersService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('_id'); // ✅ Tomar el nuevo _id
      console.log("ID obtenido en suscripción:", userId);

      if (userId) { // ✅ Si existe, llamamos al servicio
        this.userservice.getById(userId).then(user => {
          this.user = user; // ✅ Guardar el usuario en la variable
          console.log("Usuario obtenido:", this.user);
        }).catch(error => console.error("Error al obtener usuario:", error));
      } else {
        console.error("ID inválido");
      }
    });
  }
}


