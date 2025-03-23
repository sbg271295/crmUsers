import { IResponse } from './../interfaces/iresponse.interfaz';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUsers } from '../interfaces/iusers.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endPoint1: string = "https://peticiones.online/api/users?page=1";
  private endPoint2: string = "https://peticiones.online/api/users?page=2";
  private endPoint: string = "https://peticiones.online/api/users";
  private httpClient = inject(HttpClient);

  // Método para conseguir TODOS los usuarios de ambas páginas
  async getAllPromise(): Promise<IUsers[]> {
    try {
      const response1 = await lastValueFrom(this.httpClient.get<IResponse>(this.endPoint1));
      const response2 = await lastValueFrom(this.httpClient.get<IResponse>(this.endPoint2));

      const users1 = response1.results || [];
      const users2 = response2.results || [];

      return [...users1, ...users2];
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  }

  // Método para buscar usuario por ID
  async getById(id: number): Promise<IUsers | undefined> {
    try {
      // Obtener usuarios de la página 1
      const response1 = await lastValueFrom(this.httpClient.get<IResponse>(this.endPoint1));
      const usuario1 = response1.results.find(user => user.id === id);

      if (usuario1) {
        return usuario1;
      }

      const response2 = await lastValueFrom(this.httpClient.get<IResponse>(this.endPoint2));
      const usuario2 = response2.results.find(user => user.id === id);

      if (usuario2) {
        return usuario2;
      }

      console.error(`Usuario con ID ${id} no encontrado.`);
      return undefined;

    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      return undefined;
    }
  }

//Metodo para borrar aunque no podamos
  delete(id:number):Promise<IUsers>{
    return lastValueFrom(this.httpClient.delete<IUsers>(`${this.endPoint}/${id}`))

  }
//Metodo para actualizar aunque no podamos
  update(user: IUsers): Promise<IUsers> {

    let { _id, ...usersBody } = user;
    return lastValueFrom(this.httpClient.put<IUsers>(`${this.endPoint}/${_id}`, usersBody))
  }
//Metodo para insertar aunque no podamos.
  insert(user: IUsers): Promise<IUsers> {
    let { _id, ...usersBody } = user;
    return lastValueFrom(this.httpClient.post<IUsers>(this.endPoint, usersBody))
  }
}
