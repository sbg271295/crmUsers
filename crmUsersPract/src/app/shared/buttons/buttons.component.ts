import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUsers } from '../../interfaces/iusers.interface';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input()myUser!:IUsers;

  verificarId(id: number) {
    console.log("ID enviado al hacer clic:", id);
  }
}
