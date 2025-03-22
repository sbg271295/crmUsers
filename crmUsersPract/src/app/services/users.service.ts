import { IResponse } from './../interfaces/iresponse.interfaz';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUsers } from '../interfaces/iusers.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endPoint: string = "https://peticiones.online/api/users"
  private httpClient = inject(HttpClient);
 sujetos:IResponse[]=[]
 sujeto:IUsers[]=[]

  //Metodo para conseguir los usuarios de mi API de Tipo IResponse.
  getAllPromise(): Promise<IResponse>{
    return lastValueFrom(this.httpClient.get<IResponse>(this.endPoint));
  }

  async getById(id: number): Promise<IUsers | undefined> {
    try {
      const usuarios = await this.getAllPromise(); // Obtiene todos los usuarios
      const usuario = usuarios.results.find(user => user.id === id); // Filtra directament

      return usuario;
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw error;
    }
  }

}
