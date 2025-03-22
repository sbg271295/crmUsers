import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  async ngOnInit() {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
        this.user = await this.userservice.getById(id);

    } catch (error) {
      console.error("Error al obtener usuario", error);
    }
  }
}



