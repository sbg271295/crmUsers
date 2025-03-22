import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interfaz';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endPoint: string = "https://peticiones.online/api/users"
  private httpClient = inject(HttpClient);

  //Metodo para conseguir los usuarios de mi API de Tipo IResponse.
  getAllPromise(): Promise<IResponse>{
    return lastValueFrom(this.httpClient.get<IResponse>(this.endPoint));
  }
/*

  getById(id: string): Promise<IUsers> {
    return lastValueFrom(this.httpClient.get<IResponse>(`${this.endPoint}/${id}`))
  }
*/
}
