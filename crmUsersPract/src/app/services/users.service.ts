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
      const usuarios = await this.getAllPromise();
      const usuario = usuarios.find(user => user.id === id);

      return usuario;
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw error;
    }
  }
}
