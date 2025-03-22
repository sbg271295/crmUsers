import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUsers } from '../../interfaces/iusers.interface';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe,ButtonsComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() miUser!:IUsers;

  @Output()deleteItemEmit:EventEmitter<Boolean>=new EventEmitter()

deleteUser(event:Boolean){
this.deleteItemEmit.emit(event)
}
}
