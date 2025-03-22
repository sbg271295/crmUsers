import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsers } from '../../interfaces/iusers.interface';
import { UsersService } from '../../services/users.service';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";

@Component({
  selector: 'app-vista-user',
  templateUrl: './vista-user.component.html',
  styleUrl: './vista-user.component.css',
  imports: [ButtonsComponent]
})
export class VistaUserComponent {
  user!: IUsers | any;
  userservice = inject(UsersService);
  route = inject(ActivatedRoute);
  @Output() deleteItemEmit:EventEmitter<Boolean>=new EventEmitter()
  router=inject(Router)

  async ngOnInit() {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
        this.user = await this.userservice.getById(id);

    } catch (error) {
      console.error("Error al obtener usuario", error);
    }
  }

  async deleteEmployee(id:number) {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.user = await this.userservice.getById(id);
      const confirmDelete = window.confirm(`¿Estás seguro de que quieres borrar a ${this.user.first_name} ${this.user.last_name}?`);

      if (confirmDelete) {
        await this.userservice.delete(this.user.id);
        console.log("Usuario eliminado con éxito.");

        if (this.deleteItemEmit.observed) {
          this.deleteItemEmit.emit(true);
        } else {
          this.router.navigate(['/home']);
        }
      }
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
    }
  }

}



