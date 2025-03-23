import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsers } from '../../interfaces/iusers.interface';


@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  user!: IUsers | any;
  userForm: FormGroup;
  userservice = inject(UsersService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  nuevo = true;
  formularioVacio = true;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['', Validators.required]
    });
  }

  async ngOnInit() {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      if (id > 0) {
        this.nuevo=false
        this.user = await this.userservice.getById(id);
        this.formularioVacio = false;

        this.userForm.patchValue({
          username: this.user.username,
          last_name: this.user.last_name,
          email: this.user.email,
          image: this.user.image
        });


      }
    } catch (error) {
      console.error("Error al obtener usuario", error);
    }
  }

  async onSubmit() {
    if (this.userForm.valid) {
      if (this.nuevo) {
        await this.userservice.insert(this.userForm.value);
        alert('Usuario registrado con éxito');
      } else {
        const updatedUser = { ...this.user, ...this.userForm.value };
        await this.userservice.update(updatedUser);
        alert('Usuario actualizado con éxito');
      }
      this.router.navigate(['/home']);
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
