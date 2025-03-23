import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUsers } from '../../interfaces/iusers.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input()myUser!:IUsers;
  user!: IUsers | any;
  @Input()volver:Boolean=false;
  @Output() deleteItemEmit:EventEmitter<Boolean>=new EventEmitter()
  router=inject(Router)
  service=inject(UsersService)
  route=inject(ActivatedRoute)




 deleteEmployee(id: number) {

    const confirmDelete = window.confirm(`¿Estás seguro de que quieres borrar a ${this.myUser.first_name} ${this.myUser.last_name}?`);

    if (confirmDelete) {
      this.service.delete(id).then(() => {
        if (this.deleteItemEmit.observed) {
          this.deleteItemEmit.emit(true);
          console.log("Usuario eliminado");
        } else {
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
